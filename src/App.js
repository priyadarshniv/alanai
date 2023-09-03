import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey='ce08fa6ba8392fcf9582f49f7f7b31452e956eca572e1d8b807a3e2338fdd0dc/stage';
const App=() =>{ 

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle , setActivearticle] =useState(-1);
  const classes=useStyles();
  useEffect(() => {
        alanBtn({
       key : alanKey,
       onCommand: ({command,articles, number}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);         
        }else if(command === 'highlight'){
          setActivearticle((prevActivearticle)=> prevActivearticle+1);
        }else if(command === 'open'){
          const parsedNumber=number.length > 2 ? wordsToNumbers(number, {fuzzy: true }) : number ;
          const article=articles[parsedNumber - 1];
          if(parsedNumber > 20){
            //alanBtn.playText('Please try that again');
          }else if(article){
            window.open(article.url, '_blank');
           // alanBtn.playText('opening...');
          }
          
        }
      }
       
    });
  }, []);
  return(
    <div>
      <div className={classes.logoContainer}>
        <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"/>
      </div>
        <NewsCards articles= {newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;