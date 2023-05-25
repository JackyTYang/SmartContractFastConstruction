// import * as utility from './utility';
/*--------------------------------utility-----------------------------------------*/

function getBlocksByTypeFromStatementInput(statementInput, type) {
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

/*--------------------------------------------生成器------------------------------*/

Blockly.JavaScript['stateMachine'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var statementInputConnection = block.getInput("stateVariables");
  var blockList = getBlocksByTypeFromStatementInput(statementInputConnection,"stateVariable");
  // console.log(blockList[2]);
  var variableList = [];
  for(var i = 0; i<blockList.length; i++){
    variableList.push(blockList[i].getFieldValue('type'));
  }

  var code ='';
  code += "enum Stages {\n";
  for(var i = 0; i<variableList.length; i++){
    if(i==variableList.length-1)
      code += '\t' + variableList[i]+'\n';
    else
      code += '\t' + variableList[i]+',\n';
  }
  code +=  '}\n\n';
  code += 'Stages public stage = Stages.' + variableList[0] + ";";
  code += '\n\n'
  code += 'modifier atStage(Stages _stage) {\n\
  \trequire(stage == _stage, "Invalid stage");\n\
  \t_;\n}\n\n';
  code += 'modifier stageChange() {\n';
  for(var i = 0; i<variableList.length; i++){
    code += '\tif(stage==Stages.' + variableList[i] + '&& true) {\n\
      nextStage();\n\t}\n'
  }
  code += '\t_;\n}\n\n';
  code += 'function nextStage() internal {\n\
    stage = Stages(uint(stage) + 1);\n\
}\n';
  return code;
};

Blockly.JavaScript['myContract'] = function(block) {
  var definitionAndDeclaration = Blockly.JavaScript.statementToCode(block, 'definitionAndDeclaration');
  var functionBody = Blockly.JavaScript.statementToCode(block, 'functions');
  console.log(functionBody);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  code += 'contract ' + this.getFieldValue('contractName') + ' {\n';
  code += definitionAndDeclaration;
  code += functionBody;
  code += '}\n\n';
  return code;
};
  
Blockly.JavaScript['mycontractfactory'] = function(block) {
    var statements___ = Blockly.JavaScript.statementToCode(block, '合约');
    // TODO: Assemble JavaScript into code variable.
    var code = 'contract myContractFactory{ contract1 myContract1;\n};\n';
    return code;
};

Blockly.JavaScript['function'] = function(block) {
  var statements_function = Blockly.JavaScript.statementToCode(block, 'function');
  // TODO: Assemble JavaScript into code variable.
  var temp = block.getFieldValue('function');
  var inputType = this.getInputTargetBlock('input').getFieldValue('type');
  var inputVariable = this.getInputTargetBlock('input').getFieldValue('variable');
  var code = '...;\n';
  return inputType + " " + inputVariable;
};

Blockly.JavaScript['contractcomposer'] = function(block) {
  var statements___ = Blockly.JavaScript.statementToCode(block, '合约');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['DataContract'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['oracle'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['callbackfunctionoforacle'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['askforoutsidedata'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['proxycontract'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['registercontract'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['registercontract'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};