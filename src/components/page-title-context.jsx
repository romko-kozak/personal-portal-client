import {createContext, useContext, useState, useEffect} from 'react';

const PageTitleContext = createContext(null);

export const usePageTitle = () => useContext(PageTitleContext);
export const PageTitleProvider = ({children}) => {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    document.title = `RK Portal | ${pageTitle}`;
  }, [pageTitle]);

  return (
    <PageTitleContext.Provider value={{pageTitle, setPageTitle}}>
      {children}
    </PageTitleContext.Provider>
  );
};