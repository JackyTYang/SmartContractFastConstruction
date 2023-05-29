var downloadButton = document.getElementById('download-button');

downloadButton.addEventListener('click',function(){
    // 从工作区中获取块的定义 XML
    var xmlData = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    var xmlText = Blockly.Xml.domToText(xmlData);

    // 创建 Blob 对象
    var blob = new Blob([xmlText], { type: 'application/xml' });

    // 创建下载链接
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);

    // 自定义文件名
    var fileName = 'my_blocks.xml';  // 自定义文件名
    downloadLink.download = fileName;

    // 触发下载
    downloadLink.click();
});