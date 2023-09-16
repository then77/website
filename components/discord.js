import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faCircle } from '@fortawesome/free-solid-svg-icons';
import Loading from "./loading.js";

const ProfileImageSmall = styled(Image)`
  ${tw`w-4 h-4 rounded-full border border-secondary-light border-solid mr-2`}
`;

const Activity = styled(Image)`
  ${tw`bg-nav flex justify-center items-center flex-col lg:flex-row mr-3`}
  backdrop-filter: blur(2px);
`;

const LinkSpotify = styled(Link)`
  ${tw`text-primary-light text-lg md:text-3xl tracking-tighter md:tracking-tight font-bold m-0 p-0 no-underline transition-all`}
  :hover {
    ${tw`text-primary-light text-glow-secondary-light`}
  }
`;

// Console color
const cons1 = "background-color:rgb(219,39,119);color:#fff;padding:3px;";
const cons2 = "background-color:rgb(239,68,68);color:#fff;padding:3px;";
const cons3 = "background-color:transparent;color:rgb(115,115,115);";
const cons4 = "background-color:transparent;color:rgb(219,39,119);";
const cons5 = "background-color:transparent;color:rgb(217,119,6);";
const cons6 = "background-color:transparent;color:rgb(239,68,68);";
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

class LanyardClient {
  constructor(userid) {
    this.url = "wss://api.lanyard.rest/socket";
    this.socket = null;
    this.userid = userid;
    this.reconnectInterval = null;
    this.heartbeatInterval = null;
    this.reconnect = true;
    this.data = { spotify: false };
    this.howmuchclose = 0;
  }
    
  close() {
    this.reconnect = false;
    this.socket.close();
  }
    
  send_data(data) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn(
        `%cLanyard%c ~ %cClient trying to send message while websocket not ready yet!`,
        cons2, cons3, cons5
      );
    }
  }
    
  connect() {
    if (this.howmuchclose < 10) {
      this.socket = new WebSocket(this.url);
      this.socket.addEventListener('open', () => {
        console.log(
          `%cLanyard%c ~ %cWebsocket connected!`,
          cons1, cons3, cons4
        );
      
        if (this.reconnectInterval != null) {
          clearInterval(this.reconnectInterval);
          this.reconnectInterval = null;
        }
      });

      this.socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.op === 1 && data.d.heartbeat_interval) {
            if (this.heartbeatInterval != null) {
              console.warn(
                `%cLanyard%c ~ %cReceived heartbeat message while heartbeat function already running!`,
                cons2, cons3, cons5
              );
              clearInterval(this.heartbeatInterval);
              this.heartbeatInterval = null;
            }
          
            this.heartbeatInterval = setInterval(() => {
              this.howmuchclose = 0; this.send_data({op: 3})
            }, data.d.heartbeat_interval);
            this.send_data({"op": 2, "d": {"subscribe_to_id": this.userid.toString()}});
        
          } else if (data.t && (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE')) {
            if (Object.keys(data.d).length >= 1) {
              if (data.d.listening_to_spotify) {
                this.data = {
                  spotify: true,
                  title: limitCharacters(data.d.spotify.song, 18),
                  image: data.d.spotify.album_art_url,
                  url: `https://open.spotify.com/track/${data.d.spotify.track_id}`,
                  text1: limitCharacters(data.d.spotify.artist.replace(/;/g, ","), 22),
                  text2: limitCharacters(data.d.spotify.album, 20),
                }
              } else {
                let textcolor = data.d.discord_status == "online" ? tw`text-green-300` : data.d.discord_status == "idle" ? tw`text-amber-400` : data.d.discord_status == "dnd" ? tw`text-red-300` : tw`text-secondary-light`;
                
                this.data = {
                  spotify: false, tc: textcolor,
                  title: data.d.discord_user.global_name,
                  image: `https://cdn.discordapp.com/avatars/${this.userid}/${data.d.discord_user.avatar}.webp?size=512`,
                  text1: data.d.discord_status.replace("dnd", "busy"),
                  sleep: (data.d.activities.length > 0 && data.d.activities[0].details.toLowerCase().includes("sleeping"))
                }
              }
          
              console.log(
                `%cLanyard%c ~ %cPresence data received: ${data.t}`,
                cons1, cons3, cons4
              )
          } else {
            console.warn(
              `%cLanyard%c ~ %cReceived empty presence data from websocket!`,
              cons2, cons3, cons5
            );
          }
        
          } else {
            console.warn(
              `%cLanyard%c ~ %cReceived message that aren't handled by client: %o`,
              cons2, cons3, cons5, data
            );
        }
        } catch (error) {
          console.error(
            `%cLanyard%c ~ %cWebsocket received message error: %o`,
            cons2, cons3, cons6, error
          );
        }
      });

      this.socket.addEventListener('close', (event) => {
        console.error(
          `%cLanyard%c ~ %cWebsocket closed: ${event.code} ${event.reason}`,
          cons2, cons3, cons6
        );
        
        this.howmuchclose++;
        this.socket = null;
        if (this.heartbeatInterval != null) {
          clearInterval(this.heartbeatInterval);
          this.heartbeatInterval = null;
        }
      
        if (this.reconnect) {
          if (this.howmuchclose < 10) {
            this.reconnectInterval = setTimeout(() => {
              console.log(
                `%cLanyard%c ~ %cReconnecting websocket...`,
                cons1, cons3, cons4
              );
              this.connect();
            }, 10000);
          } else {
            this.reconnect = false;
            if (this.reconnectInterval != null) {
              clearInterval(this.reconnectInterval);
              this.reconnectInterval = null;
            }
          
            console.error(
              `%cLanyard%c ~ %cAbnormal crash! Should not do reconnect attempt...`,
              cons2, cons3, cons6
            );
          }
        }
      });
    } else {
      console.error(
        `%cLanyard%c ~ %cAbnormal crash! Should not do reconnect attempt...`,
        cons2, cons3, cons6
      );
    }
  }
}

const limitCharacters = (text, limit) => {
  if (text.length <= limit) {
    return text;
  }

  return text.slice(0, limit) + '...';
};

const DiscordActivity = () => {
  // Make state and add spotify false to make sure the time run first
  const [activity, setActivity] = useState({ spotify: false });
  const wsClient = new LanyardClient("962658658070704148");
  
  useEffect(() => {
    const getActivity = () => {
      const userTime = new Date();
      const gmt7Time = new Date(userTime.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
      const formattedTime = gmt7Time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      if (!wsClient.data.spotify) {
        setActivity(
          activity => ({
            ...wsClient.data,
            text2: formattedTime
          })
        );
      } else {
        setActivity(wsClient.data);
      }
    };

    wsClient.connect();
    const actint = setInterval(getActivity, 200);
    return () => {
      clearInterval(actint);
      wsClient.close();
    };
  }, []);

  return (
    <div css={tw`flex justify-center items-center flex-row md:flex-col xl:flex-row mb-12 md:mb-0`}>
      {activity.image ? (
        <div css={tw`rounded-2xl w-20 md:w-32 2xl:w-44 h-20 md:h-32 2xl:w-44 md:mb-5 xl:mb-0 mr-4 md:mr-0 xl:mr-8 shadow-lg relative`}>
          <Image src={activity.image} alt={'My profile image'} fill={true} css={tw`relative`} style={{ borderRadius: '16px' }} />
        </div>
      ) : (
        <div css={tw`rounded-2xl w-20 md:w-32 h-20 md:h-32 md:mb-5 xl:mb-0 mr-4 md:mr-0 xl:mr-8`}>
          <Loading css={tw`h-full rounded-2xl`} />
        </div>
      )}
      <div css={tw`flex justify-center items-start md:items-center xl:items-start flex-col text-left md:text-center xl:text-left`}>
        {activity.spotify && (<p css={tw`text-secondary-light text-sm md:text-base m-0 mb-1 p-0 flex justify-start items-center`}><FontAwesomeIcon icon={faSpotify} fixedWidth css={tw`text-[#1DB954] text-lg m-0 p-0 mr-1.5`} />Listening to...</p>)}
        {activity.title ? (
            activity.spotify ? (
              <LinkSpotify href={activity.url}>{activity.title}</LinkSpotify>
            ) : (
              <h1 css={tw`text-lg md:text-3xl tracking-tight font-bold m-0 p-0`}>{activity.title}</h1>
            )
        ) : (
          <div css={tw`w-32 md:w-40 h-6 md:h-8 mb-1`}>
            <Loading css={tw`w-full h-full`} />
          </div>
        )}
        {activity.text1 ? (
          activity.sleep ? (
            <p css={tw`text-amber-400 text-sm md:text-xl md:tracking-wide m-0 p-0`}>
              <FontAwesomeIcon icon={faMoon} css={tw`mr-2`} />
              Sleeping
            </p>
          ) : (
            <p css={[tw`text-sm md:text-xl md:tracking-wide m-0 p-0`, activity.tc]}>
              { activity.tc != undefined && (<FontAwesomeIcon icon={faCircle} css={tw`text-[10px] md:mb-0.5 mr-2`} />)}
              {capitalize(activity.text1)}
            </p>
          )
        ) : (
          <div css={tw`w-16 md:w-24 h-4 md:h-6 mb-1`}>
            <Loading css={tw`w-full h-full`} />
          </div>
        )}
        {activity.text2 != '' ? (
          <p css={tw`md:text-lg m-0 p-0 text-sm md:tracking-wide`}>{activity.text2}</p>
        ) : (
          <div css={tw`w-20 md:w-28 h-4 md:h-6`}>
            <Loading css={tw`w-full h-full`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscordActivity;
