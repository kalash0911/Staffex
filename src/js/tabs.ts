export const initTabs = () => {
  window.onload = () => {
    function changeTab(tabNumber: number): void {
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach((content) => {
        content.classList.remove('active');
      });

      const tabButtons = document.querySelectorAll('.tab-button');
      tabButtons.forEach((button) => {
        button.classList.remove('active');
      });

      const selectedTabContent = document.getElementById(`content${tabNumber}`);
      const selectedTabButton = document.getElementById(`tab${tabNumber}`);

      if (selectedTabContent && selectedTabButton) {
        selectedTabContent.classList.add('active');
        selectedTabButton.classList.add('active');
      }
    }

    (window as any).changeTab = changeTab;
  };
};
