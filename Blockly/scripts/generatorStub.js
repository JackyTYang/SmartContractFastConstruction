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
  var content = Blockly.JavaScript.statementToCode(block, 'content');
  functionBody = "";
  var code = '';
  var constructor = "constructor(";
  var inConstructor = "";  
  var parameterBlock = getBlocksByTypeFromStatementInput(block.getInput("constructor"),"assignment");
  var dataBlock = getBlocksByTypeFromStatementInput(block.getInput("dataStorage"),"dataContract");
  var satelliteFrame = getBlocksByTypeFromStatementInput(block.getInput("functions"),"satelliteContractFrame");
  var satelliteBlock = [];
  if(satelliteFrame.length!=0)
    satelliteBlock = getBlocksByTypeFromStatementInput(satelliteFrame[0].getInput("contract"),"myContract");//每一个都是合约
  
  var registercontract = getBlocksByTypeFromStatementInput(block.getInput("functions"),"registerContract");

  for(var i = 0; i<parameterBlock.length; i++){
    console.log(parameterBlock[i].getFieldValue('fromOutside'));
    if(parameterBlock[i].getFieldValue('fromOutside') == 'TRUE'){//如果需要外部传参构造
      if(i!=0)
        constructor += ", ";
      constructor += parameterBlock[i].getFieldValue('type') + " _" +  parameterBlock[i].getFieldValue('name');
      inConstructor += "\t\t" + parameterBlock[i].getFieldValue('name') + " = _" +  parameterBlock[i].getFieldValue('name') + "\n";
    }
    else{
      inConstructor += "\t\t" + parameterBlock[i].getFieldValue('name') + " = " + parameterBlock[i].getFieldValue('value') + "\n";
    }
  }

  for(var i = 0; i<dataBlock.length; i++){
    definitionAndDeclaration += "\t" + dataBlock[i].getFieldValue("contractName") + " public my" + dataBlock[i].getFieldValue("contractName") + ";\n";
    if(parameterBlock.length!=0)
      constructor += ", ";  
    constructor += dataBlock[i].getFieldValue('contractName') + " _" + dataBlock[i].getFieldValue("contractName");
    inConstructor += "\t\t" +  "my" + dataBlock[i].getFieldValue('contractName') + " = _" + dataBlock[i].getFieldValue('contractName') + ";\n";
  }

  for(var i = 0; i<satelliteBlock.length; i++){
    definitionAndDeclaration += "\t" + satelliteBlock[i].getFieldValue("contractName") + " public my" + satelliteBlock[i].getFieldValue("contractName") + ";\n";
    if(parameterBlock.length!=0)
      constructor += ", ";
    constructor += satelliteBlock[i].getFieldValue('contractName') + " _" + satelliteBlock[i].getFieldValue("contractName");
    inConstructor += "\t\t" +  "my" + satelliteBlock[i].getFieldValue('contractName') + " = _" + satelliteBlock[i].getFieldValue('contractName') + ";\n";
    functionBody += "\tfunction update" + satelliteBlock[i].getFieldValue('contractName') + "(" +satelliteBlock[i].getFieldValue('contractName') + " _" + satelliteBlock[i].getFieldValue('contractName') + ") public{\n";
    functionBody += "\t\t" + satelliteBlock[i].getFieldValue('contractName') + " = " + "_" + satelliteBlock[i].getFieldValue('contractName') + ";\n\t}\n";
  }

  if(registercontract.length!=0){
    var name = registercontract[0].getFieldValue("contractName");
    definitionAndDeclaration += '\t' + name + " my" + name + ";\n";
    if(parameterBlock.length!=0)
      constructor += ", ";
    constructor += name + " _" + name;
    inConstructor += "\t\t" + 'my' + name + " = _" + name + ";\n";
    inConstructor += "\t\t" + 'my' + name + ".changeBackend(address(this));\n";
  }

  constructor += ') {\n';
  constructor += inConstructor;
  constructor += "\t}\n";
  code += 'contract ' + this.getFieldValue('contractName') + ' {\n';
  code += definitionAndDeclaration;
  code += "\t" + constructor;
  code += functionBody;
  code += content;
  code += '}\n\n';
  return code;
};

Blockly.JavaScript['registerContract'] = function(block) {
  var code = '';
  code += "contract " + block.getFieldValue("contractName");
  code += `{
    address private backendContract;
    address[] private previousBackends;

    function changeBackend(address newBackend) public onlyOwner returns (bool) {
        if (newBackend != backendContract) {
            previousBackends.push(backendContract);
            backendContract = newBackend;
            return true;
        }
        return false;
    }
    
    function getBackend() public view returns (address) {
        return backendContract;
    }

    function getPreviousBackends() public view returns (address[] memory) {
        return previousBackends;
    }
}`;
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


Blockly.JavaScript['mycontractfactory'] = function(block) {
  var myContract = Blockly.JavaScript.statementToCode(block, 'myContract');
  var contractBlock = getBlocksByTypeFromStatementInput(block.getInput("contract"),"myContract");
  var code = "contract " + contractBlock[0].getFieldValue("contractName") + "Factory {\n";
  code += "\taddress[] " + contractBlock[0].getFieldValue("contractName") + "s;\n\n";
  code += "\tfunction create" + contractBlock[0].getFieldValue("contractName") + "(";
  var name = contractBlock[0].getFieldValue("contractName");
  var constructorBlock = getBlocksByTypeFromStatementInput(contractBlock[0].getInput("constructor"),"assignment");
  var constructorCode = "";
  var innerCode = "";
  for(var i = 0; i<constructorBlock.length; i++){
    var type = constructorBlock[i].getFieldValue("type");
    var _name = constructorBlock[i].getFieldValue("name");
    if(i!=0) innerCode+=", ";
    innerCode += "_" + _name;
    if(i!=0) constructorCode += ", ";
    constructorCode += type + " memory _" + _name; 
  }
  code += constructorCode + ") external {\n";
  code += "\t\t" + name + " my" + name + " = new " + name + "(" + innerCode + ");\n" + "\t\t" + name + "s.push(address(" + "my" + name + "));\n\t}\n\n";
  code += "\tfunction getAll" + name +"() external view returns (address[] memory) {\n\t\
    return " + name + "s;\n\t}\n";
  code += "}\n";
  
  return code;
};

Blockly.JavaScript['dataContract'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var storageBlock = getBlocksByTypeFromStatementInput(block.getInput("data"),"variableDefinition");
  var code = "contract " + block.getFieldValue("contractName") + " {\n";
  for(var i = 0; i<storageBlock.length; i++){
    var type = storageBlock[i].getFieldValue("type");
    var name = storageBlock[i].getFieldValue("variable");
    code += "\tmapping(bytes32 => " + type +") private " + name + ";\n\n";
    code += "\tfunction get" + name +"Value(byte32 key) public view returns (" + type +") {\n";
    code += '\t\treturn ' + name + "[key];\n\t}\n\n";
    code += "\tfunction set" + name +"Value(byte32 key, " + type + " value) public {\n";
    code += '\t\t' + name +"[key] = value;\n\t}\n\n";
  }
  code += '}\n\n';
  return code;
};


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


Blockly.JavaScript['contractcomposer'] = function(block) {
  var statements___ = Blockly.JavaScript.statementToCode(block, '合约');
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