export interface IFullpageJS {
    destroy: (arg0: string) => void;
}

export const initFullpageJs = () => {
    var fullpageInstance: null | IFullpageJS = null;

    function toggleFullPage() {
        var screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenSize <= 1024) {
            if (fullpageInstance) {
                fullpageInstance.destroy('all');
                fullpageInstance = null;
            }
        } else {
            if (!fullpageInstance) {
                fullpageInstance = new fullpage('#fullpage', {
                    scrollingSpeed: 1500,
                });
            }
        }
    }

    toggleFullPage();

    window.addEventListener('resize', function () {
        toggleFullPage();
    });
};
