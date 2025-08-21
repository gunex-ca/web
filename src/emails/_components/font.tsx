import { Font } from "@react-email/components";

export const GunExFont = () => {
  return (
    <Font
      fontFamily="Roboto"
      fallbackFontFamily="Verdana"
      webFont={{
        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
        format: "woff2",
      }}
      fontWeight={400}
      fontStyle="normal"
    />
  );
};
