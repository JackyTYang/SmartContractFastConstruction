/*-----------------------------------------------基本模块------------------------------------------------------------------------*/
Blockly.Blocks['myContract'] = {
    init: function() {
      this.appendDummyInput()
      .appendField('智能合约')
      .appendField(new Blockly.FieldTextInput('...'), 'contractName');
      this.appendStatementInput("definitionAndDeclaration")
          .appendField('定义与声明')
          .setCheck(null)
      this.appendStatementInput('constructor')
          .appendField('构造器')
          .setCheck(null)
      this.appendStatementInput("functions")
          .appendField('功能区')
          .setCheck('null')
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("默认智能合约模板");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['function'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('function')
        .appendField(new Blockly.FieldTextInput('...'), 'funcName');
      this.appendDummyInput()
        .appendField('可见性:')
        .appendField(new Blockly.FieldDropdown([
            ['internal', 'internal'],
            ['public', 'public'],
            ['external', 'external']
        ]), 'visibility');
      this.appendStatementInput('input')
        .appendField('input')
      this.appendStatementInput('return')
        .appendField('returns')
      this.appendStatementInput("modifier")
        .appendField('modifier')
        .appendField(new Blockly.FieldDropdown([
          ['pure', 'pure'],
          ['view', 'view'],
          ['payable', 'payable']
      ]), 'defaultModifier')
        .setCheck(null);
      this.appendStatementInput("functionBody")
        .appendField('函数体')
        .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['modifierDefinition'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('函数修饰器')
        .appendField(new Blockly.FieldTextInput('...'), 'modifierName');
      this.appendStatementInput('input')
        .appendField('input');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['modifier'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('修饰器')
        .appendField(new Blockly.FieldTextInput('...'), 'modifierName');
      this.appendStatementInput('input')
        .appendField('input')
      this.appendStatementInput("beforeFunction")
        .appendField('函数前修饰区')
        .setCheck(null)
      this.appendStatementInput("afterFunction")
        .appendField('函数后修饰区')
        .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['interface'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('接口')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(300);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

/*-----------------------------------------------创建模式--------------------------------------------------------------------------*/
  
  Blockly.Blocks['mycontractfactory'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('合约工厂')
        .appendField(new Blockly.FieldTextInput('...'), 'factoryName');
      this.appendStatementInput("contract")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(240);
   this.setTooltip("将已经创建好的智能合约作为输入传入工厂即可");
   this.setHelpUrl("无");
    }
  };

  Blockly.Blocks['contractcomposer'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('合约组合器')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("合约")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(240);
   this.setTooltip("将已经创建好的智能合约作为输入传入组合器即可");
   this.setHelpUrl("无");
    }
  };

/*-----------------------------------------------变量输入输出--------------------------------------------------------------------------*/

  Blockly.Blocks['input'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('输入');
      this.appendDummyInput()
        .appendField('类型')
        .appendField(new Blockly.FieldTextInput('...'), 'type');
      this.appendDummyInput()
        .appendField('名称')
        .appendField(new Blockly.FieldTextInput('...'), 'variable');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['output'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('输出');
      this.appendDummyInput()
        .appendField('类型')
        .appendField(new Blockly.FieldTextInput('...'), 'type');
      this.appendDummyInput()
        .appendField('名称')
        .appendField(new Blockly.FieldTextInput('...'), 'variable');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['variableDefinition'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('定义');
      this.appendDummyInput()
        .appendField('类型')
        .appendField(new Blockly.FieldTextInput('...'), 'type');
      this.appendDummyInput()
        .appendField('名称')
        .appendField(new Blockly.FieldTextInput('...'), 'variable');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['variableDeclaration'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('声明');
      this.appendDummyInput()
        .appendField('类型')
        .appendField(new Blockly.FieldTextInput('...'), 'type');
      this.appendDummyInput()
        .appendField('名称')
        .appendField(new Blockly.FieldTextInput('...'), 'variable');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['stateVariable'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('状态变量');
      this.appendDummyInput()
        .appendField('name')
        .appendField(new Blockly.FieldTextInput('...'), 'type');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['assignment'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('赋值');
      this.appendDummyInput()
        .appendField('类型')
        .appendField(new Blockly.FieldTextInput('...'), 'type');
      this.appendDummyInput()
        .appendField('名称')
        .appendField(new Blockly.FieldTextInput('...'), 'name');
      this.appendDummyInput()
        .appendField('外部构造？')
        .appendField(new Blockly.FieldCheckbox(true), 'fromOutside');
      this.appendDummyInput()
        .appendField('值')
        .appendField(new Blockly.FieldTextInput('...'), 'value');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


/*-----------------------------------------------内部逻辑--------------------------------------------------------------------------*/
  
  Blockly.Blocks['stateMachine'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('状态机')
        .appendField(new Blockly.FieldTextInput('...'), 'stateMachineName');
      this.appendStatementInput("stateVariables")
        .appendField('状态变量')
        .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['oracle'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('预言机')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(105);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['callbackfunctionoforacle'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('预言机回调函数')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['askforoutsidedata'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('请求外部数据函数')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(285);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['event'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('事件');
      this.appendStatementInput("stateVariables")
        .appendField('参数')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['emit'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('事件触发');
      this.appendStatementInput("stateVariables")
        .appendField('参数')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  /*-----------------------------------------------合约维护--------------------------------------------------------------------------*/

  Blockly.Blocks['datacontract'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('数据合约')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(105);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['satellitecontract'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('卫星合约')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['satellitecontractframe'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('卫星合约框架')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(195);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['proxycontract'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('代理合约')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['registercontract'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('注册合约')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['registerlist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('卫星合约维护列表')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(345);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['contractupdate'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('合约版本维护列表')
        .appendField(new Blockly.FieldTextInput('...'), 'FIELDNAME');
      this.appendStatementInput("NAME")
          .setCheck(null)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };