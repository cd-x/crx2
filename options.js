$(function () {
  $("#setLimit").click(function () {
    chrome.storage.sync.get("limit", function (budget) {
      var newLimit = parseInt($("#limit").val());
      if (newLimit) {
        chrome.storage.sync.set({ limit: newLimit }, function () {
          window.close();
        });
      }
    });
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      var notifOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Reset Total",
        message: "Total amount has been reset to 0!",
      };

      chrome.notifications.create("resetTotalNotif", notifOptions);
    });
  });
});
