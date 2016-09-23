
import assign from 'lodash/assign'

export const intializeTranslation = (i18nextProject, language = 'fr-FR', resources = []) => {
    const DEFAULT_RESSOURCE = { [language] : { translation : {focus: 'test'}}}
    i18nextProject.init({
        lng: language,
        resources: {
          [language] : {
            translation : resources.reduce( (valeurPrécédente, valeurCourante) => assign(valeurPrécédente, valeurCourante), {})
          }
        }
    }, (err, t) => {
        console.info('[FOCUS-COMPONENTS] Translation initialized !');
    });
};
