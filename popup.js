$(function () {
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    if (budget.total) {
      $("#totalSpent").text(budget.total);
    }
    if (budget.limit) {
      $("#limitAmount").text(budget.limit);
    }
  });

  $("#spend").click(function () {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }
      var amount = $("#amount").val();

      if (amount) {
        newTotal += parseInt(amount);
      }

      if (amount && newTotal > parseInt(budget.limit)) {
        var notifOptions = {
          type: "basic",
          iconUrl: "icon48.png",
          title: "Limit exceeded",
          message: "Oh no u have reaced the limit!",
        };

        chrome.notifications.create("limitNotif", notifOptions);
      }
      $("#totalSpent").text(newTotal);
      chrome.storage.sync.set({ total: newTotal });
      $("#amount").val("");
    });
  });
});
