Blockly.JavaScript['mycontract'] = function(block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'contract1 content\n';
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