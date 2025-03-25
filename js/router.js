// 简单的客户端路由器
document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  
  // 检查路径是否存在
  fetch(path)
    .then(response => {
      if (!response.ok && response.status === 404) {
        window.location.href = '/404.html';
      }
    })
    .catch(() => {
      window.location.href = '/404.html';
    });
});