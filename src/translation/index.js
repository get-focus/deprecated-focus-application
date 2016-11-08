

export const intializeTranslation = (i18nextProject, language = 'fr-FR', resources = []) => {
    i18nextProject.init({
        lng: language,
        resources: {
            [language] : {
                translation : resources.reduce((acc, newValue) => Object.assign(acc, newValue), {})
            }
        }
    }, (err, t) => {
        console.info('[FOCUS-APPLICATION] Translation initialized !');
    });
};
