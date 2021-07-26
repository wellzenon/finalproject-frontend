import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Select } from "components";

const LanguageSelect = (props) => {
  const { locale, locales, push, pathname, query } = useRouter();

  if (!locales) return null;

  const currentLocale = (locale) => {
    return { label: locale, value: locale };
  };
  const avaiableLocales = (locales) =>
    locales.map((locale) => {
      return { label: locale, value: locale };
    });
  const changeLocale = (option) => {
    if (option.value === locale) return;
    Cookies.set("NEXT_LOCALE", option.value, { expires: 365, sameSite: "Lax" });
    push({ pathname, query }, "", { locale: option.value });
  };

  return (
    <Box width="8rem" {...props}>
      <Select
        instanceId="lang"
        openMenuOnFocus
        type="text"
        options={avaiableLocales(locales)}
        defaultValue={currentLocale(locale)}
        onChange={changeLocale}
        {...props}
      />
    </Box>
  );
};

export { LanguageSelect };
