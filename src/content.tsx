import { ConfigStorageSyncRepo } from './db/config.repo';

const configStorageSyncRepo = ConfigStorageSyncRepo.getInstance();

const initAutoSkip = () => {
    const url = window.location.href;

    const targetUrl = 'https://www.inflearn.com/course/lecture';
    const indexNum = url.indexOf(targetUrl);

    if (indexNum < 0) {
        return;
    }
    const targetNode = document.querySelector('.mantine-Modal-root');
    if (!targetNode) return;

    const observerOptions = {
        childList: true,
    };

    const playerNodeObserver = new MutationObserver(async () => {
        const isEnabled = await configStorageSyncRepo.getAutoSkipIsEnabled('autoSkip');

        if (!isEnabled) return;
        document
            .querySelector('.mantine-Modal-root')
            ?.querySelectorAll('button')
            .forEach((ele) => {
                if (ele.innerText === '다음 수업보기' || ele.innerText === '다음 수업') {
                    //window.alert('지금이니');
                    ele.click();
                }
            });
    });

    playerNodeObserver.observe(targetNode!, observerOptions);
};

initAutoSkip();
