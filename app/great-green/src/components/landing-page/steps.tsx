import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Icon from '@mdi/react';
import { mdiNumeric1, mdiNumeric2, mdiNumeric3, mdiNumeric4, mdiNumeric5 } from '@mdi/js';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {useTranslation} from '../../../node_modules/react-i18next';
function Steps() {
    //internationalization
    const {t} = useTranslation('common');

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry)=>{
                console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
            } else{
                entry.target.classList.remove('show');
            }
            });
        });
    
        const hiddenItems= document.querySelectorAll('.anima');
        hiddenItems.forEach((e1)=> observer.observe(e1));
    }, [])
    
    return(
        <Container className='s_container'  sx={{ py: "80px", width:"100vw", overflow: "hidden" }}>
            
            <Box className='steps_page' sx={{
                display: {xs: 'block', sm:'contents' },
                width:{
                    xs: "100%",
                    sm: 50,
                    md: 800,
                    lg: 900,
                }
            }} >
                <div>
                <div className='steps'>
                <div className='steps_head'>{t('steps.title.head')}</div>
                <div className='s'>
                <p className='s1'>
                {t('steps.title.content')}
                </p>
                </div>
                </div>
                </div>

                    <div className='anima'>
                    <div className='step1'>
                    <Icon path={mdiNumeric1}
                        title="mdiNumeric1"
                        size={10}
                        color="black"
                    />
                    <div className='steps_body'>
                        <div className='sicon1'>
                            <ArrowRightIcon fontSize="large" className='i1'></ArrowRightIcon>
                            <ArrowRightIcon fontSize="large" className='i2'></ArrowRightIcon>
                        </div>
                        <div>
                            <div className='steps_head'>{t('step1.title.head')}</div>
                            <div className='s'>
                            <p className='s1'>{t('step1.content.label1')}</p>
                            <p className='s1'>{t('step1.content.label2')}</p>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                        </div>                           
                    

                   
                
                <div className='anima'>
                <div className='step2'style={{ fontFamily: '' }}>
                    <Icon path={mdiNumeric2}
                        title="mdiNumeric2"
                        size={10}
                        color="black"
                        
                    />
                    <div className='steps_body'>
                    <div className='sicon2'>
                        <ArrowRightIcon fontSize="large" className='i3'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i4'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i5'></ArrowRightIcon>
                    </div>
                    <div>
                        <div className='steps_head'>{t('step2.title.head')}</div>
                        <div className='s'>
                        <p className='s1'>{t('step2.content.label1')}</p>
                        <p className='s1'>{t('step2.title.label2')}</p>
                        <p className='s1'>{t('step2.title.label3')}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className='anima'>
                <div className='step3'>
                    <Icon path={mdiNumeric3}
                        title="mdiNumeric3"
                        size={10}
                        color="black"
                    />
                    <div className='steps_body'>
                    <div className='sicon3'>
                        
                        <ArrowRightIcon fontSize="large" className='i6'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i7'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i8'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i9'></ArrowRightIcon>
                    </div>
                    <div>
                        <div className='steps_head'>{t('step3.title.head')}</div>
                        <div className='s'>
                            <p className='s1'>{t('step3.content.label1')}</p>
                            <p className='s1'>{t('step3.title.label2')}</p>
                            <p className='s1'>{t('step3.title.label2')}</p>
                            <p className='s1'>{t('step3.title.label4')}</p>
                        </div>
                    </div>
                   
                    </div>
                </div>
                </div>

                <div className='anima'>
                <div className='step4'>
                    <Icon path={mdiNumeric4}
                        title="mdiNumeric4"
                        size={10}
                        color="black"
                    />
                    <div className='steps_body'>
                    <div className='sicon4'>
                        <ArrowRightIcon fontSize="large" className='i10'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i11'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i12'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i13'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i14'></ArrowRightIcon>
                    </div>
                    <div>
                        <div className='steps_head'>{t('step4.title.head')}</div>
                        <div className='s'>
                            <p className='s1'>{t('step4.content.label1')} </p>
                            <p className='s1'>{t('step4.title.label2')}</p>
                            <p className='s1'>{t('step4.title.label3')}</p>
                            <p className='s1'>{t('step4.title.label4')} </p>
                            <p className='s1'>{t('step4.title.label5')} </p>
                        </div>
                    </div>

                    </div>
                       
                </div>
                </div>

                <div className='anima'>

                
                <div className='step5'>
                    <Icon path={mdiNumeric5}
                        title="mdiNumeric5"
                        size={10}
                        color="black"
                    />
                    <div className='steps_body'>
                    <div className='sicon5'>
                        <ArrowRightIcon fontSize="large" className='i15'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i16'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i17'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i18'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i19'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i20'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i21'></ArrowRightIcon>
                        <ArrowRightIcon fontSize="large" className='i22'></ArrowRightIcon>
                    </div>
                    <div>
                    <div className='steps_head'>{t('step5.title.head')}</div>
                    <div className='s'>
                        <p className='s1'>{t('step5.content.label1')}</p>
                        <p className='s1'>{t('step5.title.label2')}</p>
                        <p className='s1'>{t('step5.title.label3')}</p>
                        <p className='s1'>{t('step5.title.label4')}</p>
                        <p className='s1'>{t('step5.title.label5')}</p>
                        <p className='s1'>{t('step5.title.label6')}</p>
                        <p className='s1'>{t('step5.title.label7')}</p>
                        <p className='s1'>{t('step5.title.label8')}</p>

                        </div>
                    </div>
                    </div>
                    </div>
                    
                </div>
                
            </Box>
        
            
      </Container>
    );
  }

export default Steps;