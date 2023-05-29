var downloadCode = document.getElementById('downloadCode');

downloadCode.addEventListener('click',function(){
    // 创建 Blob 对象
    var blob = new Blob([code], { type: 'text/plain' });

    // 创建下载链接
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);

    // 自定义文件名
    var fileName = 'my_code.txt';  // 自定义文件名
    downloadLink.download = fileName;

    // 触发下载
    downloadLink.click();
});