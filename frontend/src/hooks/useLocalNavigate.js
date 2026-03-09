import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { getLocalizedPath } from "@/utils/routeUtils";

const useLocalNavigate = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const localNavigate = (to, options) => {
    if (typeof to === 'string') {
      const localizedPath = getLocalizedPath(to, language);
      navigate(localizedPath, options);
    } else {
      // Handle cases like navigate(-1)
      navigate(to, options);
    }
  };

  return localNavigate;
};

export default useLocalNavigate;
