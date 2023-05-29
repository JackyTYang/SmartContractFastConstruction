// 获取文件输入元素和加载按钮元素
var fileInput = document.getElementById('file-input');
var loadButton = document.getElementById('load-button');

// 监听加载按钮的点击事件
loadButton.addEventListener('click', function() {
  // 检查是否选择了文件
  if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    var reader = new FileReader();

    // 监听文件读取完成的事件
    reader.onload = function(e) {
      var xmlString = e.target.result;
      // 在这里可以处理读取到的 XML 字符串
      console.log(xmlString);

      // 将 XML 字符串转换为 XML DOM 对象
      var xml = Blockly.utils.xml.textToDom(xmlString);
      // 获取 Blockly 工作区
    //   var workspace = Blockly.getMainWorkspace();
      // 还原图形块到工作区
      Blockly.Xml.domToWorkspace(xml, workspace);
    };

    // 读取文件内容
    reader.readAsText(file);

  }
});