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
  var statementInput = block.getInput("stateVariables");
  var blockList = getBlocksByTypeFromStatementInput(statementInput,"stateVariable");
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
}\n\n';
  return code;
};

Blockly.JavaScript['myContract'] = function(block) {
  var definitionAndDeclaration = Blockly.JavaScript.statementToCode(block, 'definitionAndDeclaration');
  var functionBody = Blockly.JavaScript.statementToCode(block, 'functions');
  console.log(functionBody);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  var constructor = "constructor(";
  var inConstructor = "";
  var parameterBlock = getBlocksByTypeFromStatementInput(block.getInput("constructor"),"assignment");
  for(var i = 0; i<parameterBlock.length; i++){
    console.log(parameterBlock[i].getFieldValue('fromOutside'));
    if(parameterBlock[i].getFieldValue('fromOutside') == 'TRUE'){//如果需要外部传参构造
      if(i!=0)
        constructor += ", ";
      constructor += parameterBlock[i].getFieldValue('type') + " _" +  parameterBlock[i].getFieldValue('name');
      inConstructor += "\t" + parameterBlock[i].getFieldValue('name') + " = _" +  parameterBlock[i].getFieldValue('name') + "\n";
    }
    else{
      inConstructor += "\t" + parameterBlock[i].getFieldValue('name') + " = " + parameterBlock[i].getFieldValue('value') + "\n";
    }
  }
  constructor += ') {\n\t';
  constructor += inConstructor;
  constructor += "\n}\n";
  code += 'contract ' + this.getFieldValue('contractName') + ' {\n';
  code += definitionAndDeclaration;
  code += constructor;
  code += functionBody;
  code += '}\n\n';
  return code;
};

Blockly.JavaScript['function'] = function(block) {
  var code = "";
  var funcName = block.getFieldValue('funcName');
  var visibility = block.getFieldValue('visibility');
  var defaultModifier = block.getFieldValue('defaultModifier');
  var inputBlock = getBlocksByTypeFromStatementInput(block.getInput("input"),"input");
  var outputBlock = getBlocksByTypeFromStatementInput(block.getInput("return"),"output");
  var inputList = [];
  for(var i = 0; i<inputBlock.length; i++){
    inputList.push(inputBlock[i].getFieldValue("type") + " " + inputBlock[i].getFieldValue("variable"));
  }
  var outputList = [];
  for(var i = 0; i<outputBlock.length; i++){
    outputList.push(outputBlock[i].getFieldValue("type") + " " + outputBlock[i].getFieldValue("variable"));
  }

  var modifierBlock = getBlocksByTypeFromStatementInput(block.getInput("modifier"),"modifierDefinition");
  var modifierCode = "";
  for(var i = 0; i<modifierBlock.length; i++){
    modifierCode += modifierBlock[i].getFieldValue("modifierName");
    var modifierInputBlock = getBlocksByTypeFromStatementInput(modifierBlock[i].getInput("input"),"input");
    console.log(modifierInputBlock.length);
    if(modifierInputBlock.length!=0){
      modifierCode += "(";
      for(var j = 0; j<modifierInputBlock.length; j++){
        var type = modifierInputBlock[j].getFieldValue('type');
        var variable = modifierInputBlock[j].getFieldValue('variable');
        modifierCode += type + " " + variable;
        console.log("type:" + type);
        if(j!=modifierInputBlock.length-1)
          modifierCode += ', ';
      }
      modifierCode += ")";
    }
    modifierCode += " ";
  }

  code += 'function ' + funcName + '(';
  //input
  for(var i = 0; i<inputList.length; i++){
    code += inputList[i];
    if(i!=inputList.length-1)
      code += ', ';
  }
  code += ")";
  code += " " + visibility;
  code += " " + defaultModifier;
  if(outputBlock.length!=0)
    code += " " + "returns" + " (";
  
  if(outputList.length!=0){//有输出时
    for(var i = 0; i<outputList.length; i++){
      code += outputList[i];
      if(i!=outputList.length-1)
        code += ', ';
    }
    code += ')';
  }

  code += " " + modifierCode;
  
  code += ' {\n';
  code += Blockly.JavaScript.statementToCode(block, 'functionBody');
  code += '}\n\n';
  return code;
};

Blockly.JavaScript['modifier'] = function(block) {
  var beforeFunction = Blockly.JavaScript.statementToCode(block,'beforeFunction');
  var afterFunction = Blockly.JavaScript.statementToCode(block,'afterFunction');
  var code = "";
  code += block.getFieldValue("modifierName");
  var modifierInputBlock = getBlocksByTypeFromStatementInput(block.getInput("input"),"input");
  if(modifierInputBlock.length!=0){
    code += "(";
    for(var j = 0; j<modifierInputBlock.length; j++){
      var type = modifierInputBlock[j].getFieldValue('type');
      var variable = modifierInputBlock[j].getFieldValue('variable');
      code += type + " " + variable;
      console.log("type:" + type);
      if(j!=modifierInputBlock.length-1)
        code += ', ';
    }
    code += ")";
  }
  code += "{\n";
  code += beforeFunction;
  code += "_;\n"
  code += afterFunction;
  code += "}\n\n";
  return code;
}


Blockly.JavaScript['variableDefinition'] = function(block) {
  var type = block.getFieldValue("type");
  var variable = block.getFieldValue("variable");
  return type + " " + variable + ";\n";
}

Blockly.JavaScript['variableDeclaration'] = function(block) {
  var type = block.getFieldValue("type");
  var variable = block.getFieldValue("variable");
  return type + " " + variable + ";\n";
}
  
Blockly.JavaScript['mycontractfactory'] = function(block) {
    var statements___ = Blockly.JavaScript.statementToCode(block, '合约');
    // TODO: Assemble JavaScript into code variable.
    var code = 'contract myContractFactory{ contract1 myContract1;\n};\n';
    return code;
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