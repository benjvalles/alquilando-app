import { _, init, getLocaleFromNavigator, addMessages } from 'svelte-i18n';
import es from '../lang/es.json';
import en from '../lang/en.json';

/* register('en', () => import('../lang/en.json'));
register('es', () => import('../lang/es.json')) */;
addMessages('en', en);
addMessages('es', es);

const locales = {
  en: "English",
  es: "Español",
};
const fallbackLocale = "en";

function language(locale)
{
  return locale.replace("_", "-").split("-")[0];
}

function supported(locale)
{
  if (Object.keys(locales).includes(locale)) {
    return locale;
  } else {
    return fallbackLocale;
  }
}

export const setup = (options = {}) => {
	const locale_ = supported(
    options.locale ||
      language(getLocaleFromNavigator()),
  );
  init({ initialLocale: locale_ });
};

export { _ };