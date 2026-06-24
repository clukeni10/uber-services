import {useEffect} from 'react';

export const usePageTitle = (title:string)=>{
useEffect(()=>{
    const tituloOriginal = document.title;

    document.title = `${title}`;

    return () => {
      document.title = tituloOriginal;
    };
  }, [title]);
};
