import Header from 'components/header';
import Sidebar from 'components/sidebar';
import {usePageTitle} from 'components/page-title-context';
import {SearchProvider} from 'components/search-context';
import PermissionsProvider from 'components/permissions-context';

import './styles.scss';

const MainTemplate = ({children, user}) => {
  const {pageTitle} = usePageTitle();

  return (
    <PermissionsProvider user={user}>
      <div className='base-container'>
        <Sidebar user={user} />
        <SearchProvider>
          <main>
            <Header user={user} />
            <div className='page-content-container'>
              <section>
                <header className='page-header'>
                  <h1 style={{color: '#f9f9f9', fontSize: '48px', margin: '16px 0', padding: 0}}>{pageTitle}</h1>
                </header>
                <div className='page-content' style={{height: 'calc(100% - 88px)', overflow: 'auto'}}>
                  {children}
                </div>
              </section>
              <aside className='right-side-block'></aside>
            </div>
          </main>
        </SearchProvider>
      </div>
    </PermissionsProvider>
  );
};

export default MainTemplate;