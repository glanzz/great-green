import { Box, Card } from "@mui/material";

import Avatar from '@mui/material/Avatar';
import { t } from "i18next";
import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
  //internalization
  

const AboutCard = () => (
   
    <div style={{padding: "40px", border: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-between", color: "white"}} >
        <div style={{zIndex: 999}}>
                <div className='about_head'>{t('aboutus.title')}</div>
                <div className='a'>
                <p className='s1 s1-small'> 
                {t('aboutus.content')}
                </p> 
                </div>
                </div>
                <Avatar alt="Remy Sharp"
             src="/great green wall.jpeg"
             sx={{ width: "300px", height: "300px", zIndex: 999 }}
            />
            </div>
);

//interacting animation
const InteractiveComponent: React.FC = () => {
    const {t} = useTranslation('common');  
    const interBubbleRef = useRef<HTMLDivElement>(null);
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
        curX = 0.5 * tgX;
        curY = 0.5 * tgY;
        if (interBubbleRef.current) {
            interBubbleRef.current.style.transform = `translateX(0%) translateY(0%) translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            //interBubbleRef.current.style.left = `${curX - 300}px`;
            //interBubbleRef.current.style.top = `${curY - 300}px`;
        }
        requestAnimationFrame(move);
    }

    useEffect(() => {
        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        });

        move();

        return () => {
            window.removeEventListener('mousemove', (event) => {
                tgX = event.clientX-10;
                tgY = event.clientY;
            });
        }
    }, []);
    

return(
    <Box component="section">
    
        <div >
            <div className='about'>
                <AboutCard />
                <div className="interactive" style={{width: "400px", height: "500px", }} ref={interBubbleRef}></div>
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
            </div>
        </div>     
    </Box>

);
}


export default InteractiveComponent;