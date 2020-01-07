//解决返回键直接退出应用问题
document.addEventListener('plusready', function() {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', function() {
    webview.canBack(function(e) {
      if(e.canBack) {
        webview.back();//返回上一页
      } else {
        webview.close(); //关闭应用
      }
    })
  });
});