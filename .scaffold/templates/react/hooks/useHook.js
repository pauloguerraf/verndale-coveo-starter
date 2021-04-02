import { useMemo } from 'react';

function use{{namePascalCase}}(props) {
  const labels = useMemo(() => JSON.parse(props.labels), []);
  
  return {
    labels
  };
}

export default use{{namePascalCase}};
