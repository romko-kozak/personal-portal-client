import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {usePageTitle} from './page-title-context';

function withTitle(ComposedComponent, title) {
  const ComponentWithTitle = (props) => {
    const location = useLocation();
    const {setPageTitle} = usePageTitle();

    useEffect(() => {
      document.title = `${title} | RK Portal`;
      setPageTitle(title);
    }, [location]);

    useEffect(() => {
      return () => setPageTitle('');
    }, []);

    return (
      <ComposedComponent {...props} />
    );
  };

  return ComponentWithTitle;
}

export default withTitle;