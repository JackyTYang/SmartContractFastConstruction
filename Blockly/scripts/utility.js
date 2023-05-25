export function getBlocksByTypeFromStatementInput(statementInputConnection, type) {
    var blockList = [];
  
    // 获取 statementInput 区域的连接
    var statementInputConnection = statementInput.connection;
  
    // 获取连接上的所有块
    var blocks = statementInputConnection.targetBlock();
  
    // 遍历块链表
    while (blocks) {
      // 检查块的类型是否匹配
      if (blocks.type === type) {
        blockList.push(blocks);
      }
  
      // 获取下一个块
      blocks = blocks.nextConnection && blocks.nextConnection.targetBlock();
    }
  
    return blockList;
  }