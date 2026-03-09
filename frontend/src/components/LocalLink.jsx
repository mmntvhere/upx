import React, { useContext, forwardRef } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "@/contexts/LanguageContext";
import { getLocalizedPath } from "@/utils/routeUtils";

const LocalLink = forwardRef(({ to, children, ...props }, ref) => {
  const { language } = useContext(LanguageContext);
  
  // If "to" is not a string (e.g. object), we let it pass as is for simplicity, 
  // but usually in this app it's a string.
  const localizedPath = typeof to === 'string' ? getLocalizedPath(to, language) : to;
  
  return (
    <Link to={localizedPath} ref={ref} {...props}>
      {children}
    </Link>
  );
});

LocalLink.displayName = "LocalLink";

export default LocalLink;
