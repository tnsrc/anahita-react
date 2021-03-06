import hashtagFilter from './hashtag';
import mentionFilter from './mention';
import urlFilter from './url';

const styleClassesLink = 'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary';

const contentfilter = (props) => {
  const { text, filters } = props;
  let result = text;

  if (filters.includes('url')) {
    result = urlFilter({
      text: result,
      classes: styleClassesLink,
    });
  }

  if (filters.includes('hashtag')) {
    result = hashtagFilter({
      text: result,
      classes: styleClassesLink,
    });
  }

  if (filters.includes('mention')) {
    result = mentionFilter({
      text: result,
      classes: styleClassesLink,
    });
  }

  return result;
};

export default contentfilter;
