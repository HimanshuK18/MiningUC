const fs = require('fs');
const contractPath = './miningcontracts/ContractandTransaction.sol';
const contractPathBusinessRule = './miningcontracts/MiningBusinessRules.sol';
const Web3 = require('web3');
const NodeURL = "http://13.232.9.135:22000";
const account = '0xed9d02e382b34818e88b88a309c7fe71e65f419d';
const PrivateTo = "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc=";
const dbUrl = require("../config/db");
const contractFolder = '../contract/';
const abiDefinitions = require("../config/abi");
const mongojs = require('mongojs');

function SetWeb3() {
  if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
  else { web3 = new Web3(new Web3.providers.HttpProvider(NodeURL)); }
}

function GetAllData(cid, callback) {
  var db = mongojs(dbUrl.url, ['SmartContract']);
  db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
    if (err) { console.log(" Woops! The error took place here... "); }
    else {
      SetWeb3();
      var AllData = web3.eth.contract(docc.abi).at(docc.contractaddress);
      var BRAllData = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);
      db.close();
      callback(AllData, BRAllData);
    }
  });
}

module.exports = {
  PublishDataContract: function (doc, callback) {
    if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
    else { web3 = new Web3(new Web3.providers.HttpProvider(NodeURL)); }
    web3.eth.defaultAccount = account;
    var Bytecode = "0x606060405234156200001057600080fd5b60405162000b0038038062000b008339810160405280805190910190506000818051620000429291602001906200014d565b506020604051908101604052600081526001908051620000679291602001906200014d565b5060206040519081016040526000815260029080516200008c9291602001906200014d565b506020604051908101604052600081526003908051620000b19291602001906200014d565b506020604051908101604052600081526004908051620000d69291602001906200014d565b506020604051908101604052600081526005908051620000fb9291602001906200014d565b506020604051908101604052600081526006908051620001209291602001906200014d565b506020604051908101604052600081526007908051620001459291602001906200014d565b5050620001f2565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200019057805160ff1916838001178555620001c0565b82800160010185558215620001c0579182015b82811115620001c0578251825591602001919060010190620001a3565b50620001ce929150620001d2565b5090565b620001ef91905b80821115620001ce5760008155600101620001d9565b90565b6108fe80620002026000396000f3006060604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630c76849b81146100df57806314d5f57c1461016957806318554380146101bc578063231de208146101cf5780632e63fee614610220578063883804fb14610233578063aa4a9b3514610284578063ac9604f714610297578063b137c4ff146102e8578063b8a5b406146102fb578063d597ab1b1461030e578063da51eb2414610321578063dbe1d26e14610372578063e06dd438146103c3578063f61e3a25146103d6575b600080fd5b34156100ea57600080fd5b6100f2610427565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561012e578082015183820152602001610116565b50505050905090810190601f16801561015b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561017457600080fd5b6101ba60046024813581810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506104c595505050505050565b005b34156101c757600080fd5b6100f26104dc565b34156101da57600080fd5b6101ba60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061054795505050505050565b341561022b57600080fd5b6100f261055a565b341561023e57600080fd5b6101ba60046024813581810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506105c595505050505050565b341561028f57600080fd5b6100f26105d8565b34156102a257600080fd5b6101ba60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061064395505050505050565b34156102f357600080fd5b6100f2610656565b341561030657600080fd5b6100f26106c1565b341561031957600080fd5b6100f261072c565b341561032c57600080fd5b6101ba60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061079795505050505050565b341561037d57600080fd5b6101ba60046024813581810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506107aa95505050505050565b34156103ce57600080fd5b6100f26107bd565b34156103e157600080fd5b6101ba60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061082895505050505050565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b820191906000526020600020905b8154815290600101906020018083116104a057829003601f168201915b505050505081565b60068180516104d8929160200190610837565b5050565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60018180516104d8929160200190610837565b60078054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60048180516104d8929160200190610837565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60058180516104d8929160200190610837565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60078180516104d8929160200190610837565b60038180516104d8929160200190610837565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104bd5780601f10610492576101008083540402835291602001916104bd565b60028180516104d89291602001905b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061087857805160ff19168380011785556108a5565b828001600101855582156108a5579182015b828111156108a557825182559160200191906001019061088a565b506108b19291506108b5565b5090565b6108cf91905b808211156108b157600081556001016108bb565b905600a165627a7a72305820e27f5d720a73c4730faf6a928ddad912804b695716f03efc087ad060e61dd7200029";
    //var simpleCompiled = web3.eth.compile.solidity(contractcontent);
    //var simpleRoot = Object.keys(simpleCompiled)[0];
    //var simpleContract = web3.eth.contract(simpleCompiled[simpleRoot].info.abiDefinition);
    //var abiDefinition = simpleCompiled[simpleRoot].info.abiDefinition;
    var simpleContract = web3.eth.contract(abiDefinitions.abi);
    var simple = simpleContract.new(JSON.stringify(doc), { from: web3.eth.defaultAccount, data: Bytecode, gas: 30000000, privateFor: [PrivateTo] }, function (e, contract) {
      if (e) {
        console.log("err creating contract:", e);
      } else {
        if (!contract.address) {
          var transactionHash = contract.transactionHash;
          var contractaddress = contract.address;
          console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
          var transactionHash = contract.transactionHash;
          var contractaddress = contract.address;
          console.log("Contract mined! Address: " + contract.address);
          //Save all the contract details in MongoDB
          var db = mongojs(dbUrl.url, ['SmartContract']);
          var cData = { 'contractid': JSON.stringify(doc._id).replace(/"/g, ""), 'contractorid': doc.contractor, 'abi': abiDefinitions.abi, 'contractaddress': contractaddress, 'contracthash': transactionHash };
          db.SmartContract.insert(cData, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else { db.close(); callback('ok', doc); }
          });
        }
      }
    });

  },
  PublishBusinessRuleContract: function (doc, callback) {
    var id = JSON.stringify(doc._id).replace(/"/g, "");
    var Bytecode = '0x6060604052341561000f57600080fd5b60405161156e38038061156e83398101604052808051820191906020018051820191906020018051906020019091908051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836040518082805190602001908083835b6020831015156100c857805182526020820191506020810190506020830392506100a3565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916856040518082805190602001908083835b60208310151561012f578051825260208201915060208101905060208303925061010a565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191614600060146101000a81548160ff02191690831515021790555060028360070b13600060166101000a81548160ff0219169083151502179055508160070b8160070b1215600060156101000a81548160ff021916908315150217905550505050505061139d806101d16000396000f300606060405260043610610196576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461019b578063116b752f146101f057806318f54e871461021d5780631d32cde11461024a5780631f96e4fa146102d85780632cc88d451461030557806335ddf2531461033257806337d922771461035f57806341c0e1b51461038c5780634ca38da5146103a15780635136a320146103ce5780635723454a1461041857806357495ae21461044557806359c159d6146104725780635a5cbd5f1461049f57806368e2adfa146104cc5780636a484009146105e95780636c9107e8146106635780636ef98808146106d157806390df1b46146106fe5780639326d3831461072b578063961b212114610758578063a693025a14610785578063cc0be631146107b7578063cc86c01b146107e4578063cfb882471461082e578063dff5c6ce14610878578063ec1e878f146108a5578063efd2f14914610937578063f0bb241714610964578063fe67c37114610991578063ff72450e146109be575b600080fd5b34156101a657600080fd5b6101ae6109eb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101fb57600080fd5b610203610a10565b604051808215151515815260200191505060405180910390f35b341561022857600080fd5b610230610a23565b604051808215151515815260200191505060405180910390f35b341561025557600080fd5b61025d610a35565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561029d578082015181840152602081019050610282565b50505050905090810190601f1680156102ca5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102e357600080fd5b6102eb610ad3565b604051808215151515815260200191505060405180910390f35b341561031057600080fd5b610318610ae6565b604051808215151515815260200191505060405180910390f35b341561033d57600080fd5b610345610af9565b604051808215151515815260200191505060405180910390f35b341561036a57600080fd5b610372610b0c565b604051808215151515815260200191505060405180910390f35b341561039757600080fd5b61039f610b1f565b005b34156103ac57600080fd5b6103b4610bb0565b604051808215151515815260200191505060405180910390f35b34156103d957600080fd5b610416600480803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b906020019091905050610bc3565b005b341561042357600080fd5b61042b610c0f565b604051808215151515815260200191505060405180910390f35b341561045057600080fd5b610458610c22565b604051808215151515815260200191505060405180910390f35b341561047d57600080fd5b610485610c35565b604051808215151515815260200191505060405180910390f35b34156104aa57600080fd5b6104b2610c48565b604051808215151515815260200191505060405180910390f35b34156104d757600080fd5b6104df610c5b565b604051808f1515151581526020018e1515151581526020018d1515151581526020018c1515151581526020018b1515151581526020018a151515158152602001891515151581526020018815151515815260200187151515158152602001861515151581526020018515151515815260200184151515158152602001806020018' +
    '3151515158152602001828103825284818151815260200191508051906020019080838360005b838110156105a1578082015181840152602081019050610586565b50505050905090810190601f1680156105ce5780820380516001836020036101000a031916815260200191505b509f5050505050505050505050505050505060405180910390f35b34156105f457600080fd5b6105fc610e10565b6040518089151515158152602001881515151581526020018715151515815260200186151515158152602001851515151581526020018415151515815260200183151515158152602001821515151581526020019850505050505050505060405180910390f35b341561066e57600080fd5b6106cf600480803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b906020019091905050610eb5565b005b34156106dc57600080fd5b6106e4610f77565b604051808215151515815260200191505060405180910390f35b341561070957600080fd5b610711610f8a565b604051808215151515815260200191505060405180910390f35b341561073657600080fd5b61073e610f9d565b604051808215151515815260200191505060405180910390f35b341561076357600080fd5b61076b610fb0565b604051808215151515815260200191505060405180910390f35b341561079057600080fd5b6107b5600480803560070b90602001909190803560070b906020019091905050610fc3565b005b34156107c257600080fd5b6107ca611096565b604051808215151515815260200191505060405180910390f35b34156107ef57600080fd5b61082c600480803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b9060200190919050506110a9565b005b341561083957600080fd5b610876600480803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190505061110d565b005b341561088357600080fd5b61088b611159565b604051808215151515815260200191505060405180910390f35b34156108b057600080fd5b610935600480803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190803560070b90602001909190505061116c565b005b341561094257600080fd5b61094a61126c565b604051808215151515815260200191505060405180910390f35b341561096f57600080fd5b61097761127f565b604051808215151515815260200191505060405180910390f35b341561099c57600080fd5b6109a4611292565b604051808215151515815260200191505060405180910390f35b34156109c957600080fd5b6109d16112a5565b604051808215151515815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000601d9054906101000a900460ff1681565b6002809054906101000a900460ff1681565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610acb5780601f10610aa057610100808354040283529160200191610acb565b820191906000526020600020905b815481529060010190602001808311610aae57829003601f168201915b505050505081565b600260089054906101000a900460ff1681565b600060179054906101000a900460ff1681565b600260069054906101000a900460ff1681565b6000601a9054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610bae576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b600260049054906101000a900460ff1681565b8360070b8360070b12156000601e6101000a81548160ff0219169083151502179055508160070b8160070b12156000601f6101000a81548160ff02191690831515021790555050505050565b600060159054906101000a900460ff1681565b600260019054906101000a900460ff1681565b6000601b9054906101000a900460ff1681565b600260079054906101000a900460ff1681565b600080600080600080600080600080600080610c756112b8565b60008060149054906101000a900460ff16600060159054906101000a900460ff166000601690' +
    '54906101000a900460ff16600060179054906101000a900460ff16600060189054906101000a900460ff16600060199054906101000a900460ff166000601a9054906101000a900460ff166000601b9054906101000a900460ff166000601c9054906101000a900460ff166000601d9054906101000a900460ff166000601e9054906101000a900460ff166000601f9054906101000a900460ff166001600260009054906101000a900460ff16818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ddd5780601f10610db257610100808354040283529160200191610ddd565b820191906000526020600020905b815481529060010190602001808311610dc057829003601f168201915b505050505091509d509d509d509d509d509d509d509d509d509d509d509d509d509d50909192939495969798999a9b9c9d565b600080600080600080600080600260019054906101000a900460ff166002809054906101000a900460ff16600260039054906101000a900460ff16600260049054906101000a900460ff16600260059054906101000a900460ff16600260069054906101000a900460ff16600260079054906101000a900460ff16600260089054906101000a900460ff16975097509750975097509750975097509091929394959697565b8560070b6001880360070b13158015610ed757508560070b6001880160070b12155b6000601a6101000a81548160ff0219169083151502179055508360070b6001860360070b13158015610f1257508360070b6001860160070b12155b6000601b6101000a81548160ff0219169083151502179055508260070b8260070b12156000601c6101000a81548160ff02191690831515021790555060008160070b146000601d6101000a81548160ff02191690831515021790555050505050505050565b600060169054906101000a900460ff1681565b600060189054906101000a900460ff1681565b6000601f9054906101000a900460ff1681565b600260059054906101000a900460ff1681565b6000601d9054906101000a900460ff16156110925760008260070b148015610fee575060008160070b145b15611044576040805190810160405280601181526020017f46616365206973206f6e6c79206f72652e0000000000000000000000000000008152506001908051906020019061103e9291906112cc565b50611091565b6040805190810160405280601581526020017f466163652077697468206f7265202620776173746500000000000000000000008152506001908051906020019061108f9291906112cc565b505b5b5050565b600260039054906101000a900460ff1681565b8260070b6001850360070b131580156110cb57508260070b6001850160070b12155b600060196101000a81548160ff0219169083151502179055508160070b8160070b1215600060186101000a81548160ff02191690831515021790555050505050565b8360070b8360070b1215600260076101000a81548160ff0219169083151502179055508160070b8160070b1215600260086101000a81548160ff02191690831515021790555050505050565b6000601c9054906101000a900460ff1681565b8860070b60018b0360070b1315801561118e57508860070b60018b0160070b12155b6002806101000a81548160ff0219169083151502179055508660070b6001890360070b131580156111c857508660070b6001890160070b12155b600260036101000a81548160ff0219169083151502179055508460070b6001870360070b1315801561120357508460070b6001870160070b12155b600260046101000a81548160ff0219169083151502179055508260070b8460070b14600260056101000a81548160ff0219169083151502179055508060070b8260070b14600260066101000a81548160ff02191690831515021790555050505050505050505050565b600260009054906101000a900460ff1681565b600060199054906101000a900460ff1681565b600060149054906101000a900460ff1681565b6000601e9054906101000a900460ff1681565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061130d57805160ff191683800117855561133b565b8280016001018555821561133b579182015b8281111561133a57825182559160200191906001019061131f565b5b509050611348919061134c565b5090565b61136e91905b8082111561136a576000816000905550600101611352565b5090565b905600a165627a7a72305820b5d2b0f25a664b93fcaaa01566eb0bdde31a12d6a88a75072d94bab4cb380a560029';
    if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
    else { web3 = new Web3(new Web3.providers.HttpProvider(NodeURL)); }
    //get the company contract data
    var db = mongojs(dbUrl.url, ['SmartContract']);
    db.SmartContract.findOne({ contractid: id }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        var ContractAddress = docc.contractaddress;
        var abi = docc.abi;
        var CompanyContract = web3.eth.contract(abi).at(ContractAddress);
        CompanyContract.setDrillingData(JSON.stringify(doc.drillingdata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        var CompanyContractData = JSON.parse(CompanyContract.ContractData());
        web3.eth.defaultAccount = account;
        var simpleContract = web3.eth.contract(abiDefinitions.abibr);
        var simple = simpleContract.new(CompanyContractData.contractdata.Miniral, doc.drillingdata.miniraldrilling, doc.drillingdata.oregrade, CompanyContractData.contractdata.samplesize, doc.drillingdata.drilledforsampling, { from: web3.eth.defaultAccount, data: Bytecode, gas: 30000000, privateFor: [PrivateTo] }, function (e, contract) {
          if (e) {
            console.log("error creating contract:", e);
          } else {
            if (!contract.address) {
              var transactionHash = contract.transactionHash;
              var contractaddress = contract.address;
              console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
            } else {
              var transactionHash = contract.transactionHash;
              var contractaddress = contract.address;
              console.log("Contract mined! Address: " + contract.address);
              //Update all the contract details in MongoDB
              db.SmartContract.findAndModify({
                query: { contractid: id },
                update: {
                  $set: { abibr: abiDefinitions.abibr, contractaddressbr: contractaddress, contracthashbr: transactionHash }
                }, new: false
              }, function (err, doc) {
                if (err) { console.log(" Woops! The error took place here... "); }
                else { db.close(); callback("ok"); }
              });
            }
          }
        });
      }
    });
  },
  GetDrillingReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var ContractorDrillingData = JSON.parse(AllData.DrillingData());
      var DrillingReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "DiscardFaceDrillingReport": BRAllData.boolDiscardFaceDrilling(),
        "SamplingReport": BRAllData.boolSampling(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "SampleSize": CompanyContractData.contractdata.samplesize,
        "OreGrade": ContractorDrillingData.oregrade
      }
      callback('ok', DrillingReport);
    });
  },
  GetBlastingReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var ContractorDrillingData = JSON.parse(AllData.DrillingData());
      var BlastingReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "DilutionReport": BRAllData.boolDilutionBlasting(),
        "TonnageReport": BRAllData.boolTonnageBlasting(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "Tonnage": CompanyContractData.contractdata.blasttonnage,
        "Dilution": ContractorDrillingData.dilution
      }
      callback('ok', BlastingReport);
    });
  },
  GetExcavationReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var ContractorExcavationData = JSON.parse(AllData.ExcavationData());
      var ContractorDrillingData = JSON.parse(AllData.DrillingData());
      var BlastingReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "OreGradeReport": BRAllData.boolOreGradeExcavation(),
        "DilutionReport": BRAllData.boolDilutionExcavation(),
        "TonnageReport": BRAllData.boolTonnageExcavation(),
        "WasteReport": BRAllData.boolWasteExcavation(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "OreGrade": ContractorDrillingData.oregrade,
        "Dilution": ContractorDrillingData.dilution,
        "Tonnage": CompanyContractData.contractdata.excavationtonnage
      }
      callback('ok', BlastingReport);
    });
  },
  GetLoadingReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var ContractorLoadingData = JSON.parse(AllData.LoadingData());
      var LoadingReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "TonnageReport": BRAllData.boolTonnageLoading(),
        "TripsReport": BRAllData.boolTripsLoading(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "Tonnage": CompanyContractData.contractdata.tonnagetransported,
        "Trips": CompanyContractData.contractdata.mininumtripsloaded
      }
      callback('ok', LoadingReport);
    });
  },
  GetVolumetricsurveyReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var VolumetricsurveyData = JSON.parse(AllData.WasteDumpData());
      var VolumetricsurveyReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "WasteReport": BRAllData.strWasteDump(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "Waste": CompanyContractData.contractdata.tonnagetransported//to be edited
      }
      callback('ok', VolumetricsurveyReport);
    });
  },
  GetStockpileSamplingReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var StockpileSamplingData = JSON.parse(AllData.StockpileSamplingData());
      var DrillingData = JSON.parse(AllData.StockpileSamplingData());
      var ExcavationData = JSON.parse(AllData.ExcavationData());
      var StockpileSamplingReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "OreGradeReport": BRAllData.boolStockpileStockpileOreGrade(),
        "DilutionReport": BRAllData.boolStockpileDilution(),
        "MoistureReport": BRAllData.boolStockpileMoisture(),
        "TonnageReport": BRAllData.boolStockpileTonnage(),
        "GradeReconciliationReport": BRAllData.boolGradeReconciliation(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "OreGrade": DrillingData.oregrade,
        "Dilution": DrillingData.dilution,
        "Moisture": DrillingData.moisturecontent
      }
      callback('ok', StockpileSamplingReport);
    });
  },
  GetCompanyReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var DrillingData = JSON.parse(AllData.DrillingData());
      var StockpileSamplingData = JSON.parse(AllData.StockpileSamplingData());
      var ExcavationData = JSON.parse(AllData.ExcavationData());
      var AllData = [];
      var BusinessRules1 = BRAllData.ReturnAllBusinessRules.call({ from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] }, function (err, res) {
      var BusinessRules1 = BRAllData.ReturnAllBusinessRules1.call({ from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] }, function (err, res1) {
        var gradereconciliation = false;
        var tonnagereconciliation = false;
        if (DrillingData.oregrade == StockpileSamplingData.oregrade)
        {var gradereconciliation = true;}

        if (ExcavationData.tonnage == StockpileSamplingData.tonnage)
        {var tonnagereconciliation = true;}

          AllData.push({'MiniralReport':res[0]});//0

          AllData.push({'OreGradeExcavation':res[6]});
          AllData.push({'OreGradeStockpileSampling':res1[1]});

          AllData.push({'DilutionBlasting':res[5]});
          AllData.push({'DilutionExcavation':res[7]});//4
          AllData.push({'DilutionStockpileSampling':res1[3]});

          AllData.push({'GradeReconciliation':res1[5]});

          AllData.push({'TonnageReconciliation':res1[4]});

          AllData.push({'SampleReport':res[1]});//8

          AllData.push({'BlastTonnage':res[4]});

          AllData.push({'ExcavationTonnage':res[8]});//10

          AllData.push({'LoadingTonnage':res[10]});//11

          AllData.push({'GradeReconciliation':gradereconciliation});//12
          AllData.push({'TonnageReconciliation':tonnagereconciliation});//13
          tonnagereconciliation

          callback('ok', AllData);
        });
      });
    });
  },
  GetTransportationToCrusherReport: function (cid, uid, callback) {
    GetAllData(cid, function (AllData, BRAllData) {
      var CompanyContractData = JSON.parse(AllData.ContractData());
      var TransportationToCrusherReport = {
        "MiniralReport": BRAllData.boolMiniral(),
        "TonnageReport": BRAllData.boolTonnageTransportedToCrusher(),
        "TripsReport": BRAllData.boolMinimumTripsToCrusher(),
        "Miniral": CompanyContractData.contractdata.Miniral,
        "Tonnage": CompanyContractData.contractdata.mininumtonnagecrusher,
        "Trips": CompanyContractData.contractdata.mininumtripscrusher
      }
      callback('ok', TransportationToCrusherReport);
    });
  },
  SaveBlastingData: function (doc, callback) {
    //publish the business rules contract and execute the blasting business rules
    var db = mongojs(dbUrl.url, ['SmartContract']);
    var cid = JSON.stringify(doc._id).replace(/"/g, "");
    db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        SetWeb3();
        var CompanyContract = web3.eth.contract(docc.abi).at(docc.contractaddress);
        var CompanyContractBR = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);
        var CompanyContractData = JSON.parse(CompanyContract.ContractData());
        var ContractorDrillingData = JSON.parse(CompanyContract.DrillingData());
        CompanyContract.setBlastingData(JSON.stringify(doc.blastingdata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        CompanyContractBR.setBlastingReport(ContractorDrillingData.dilution, doc.blastingdata.dilution, CompanyContractData.contractdata.blasttonnage, doc.blastingdata.tonnage, { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        callback('ok');
      }
    });

  },
  SaveExcavationData: function (doc, callback) {
    //publish the business rules contract and execute the blasting business rules
    var db = mongojs(dbUrl.url, ['SmartContract']);
    var cid = JSON.stringify(doc._id).replace(/"/g, "");
    db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        SetWeb3();
        var CompanyContract = web3.eth.contract(docc.abi).at(docc.contractaddress);
        var CompanyContractBR = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);
        var CompanyContractData = JSON.parse(CompanyContract.ContractData());
        var ContractorDrillingData = JSON.parse(CompanyContract.DrillingData());
        CompanyContract.setExcavationData(JSON.stringify(doc.excavationdata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        CompanyContractBR.setExcavationReport(ContractorDrillingData.oregrade, doc.excavationdata.oregrade, ContractorDrillingData.dilution,
          doc.excavationdata.dilution, CompanyContractData.contractdata.tonnagetransported, doc.excavationdata.tonnage, doc.excavationdata.waste,
          { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        callback('ok');
      }
    });
  },
  SaveLoadingData: function (doc, callback) {
    //publish the business rules contract and execute the blasting business rules
    var db = mongojs(dbUrl.url, ['SmartContract']);
    var cid = JSON.stringify(doc._id).replace(/"/g, "");
    db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        SetWeb3();
        var CompanyContract = web3.eth.contract(docc.abi).at(docc.contractaddress);
        var CompanyContractBR = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);
        var CompanyContractData = JSON.parse(CompanyContract.ContractData());
        var ContractorDrillingData = JSON.parse(CompanyContract.DrillingData());
        CompanyContract.setLoadingData(JSON.stringify(doc.loadingdata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        CompanyContractBR.setLoadingReport(CompanyContractData.contractdata.tonnagetransported, doc.loadingdata.tonnagetransported,
          CompanyContractData.contractdata.mininumtripsloaded, doc.loadingdata.numberoftrips, { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        callback('ok');
      }
    });
  },
  SaveVolumetricsurveyData: function (doc, callback) {
    //publish the business rules contract and execute the blasting business rules
    var db = mongojs(dbUrl.url, ['SmartContract']);
    var cid = JSON.stringify(doc._id).replace(/"/g, "");
    db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        SetWeb3();
        var CompanyContract = web3.eth.contract(docc.abi).at(docc.contractaddress);//contract 1 data
        var CompanyContractBR = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);//contract 2 data
        //  var CompanyContractData = JSON.parse(CompanyContract.ContractData());//company data from contract 1 
        // var ContractorExcavationData = JSON.parse(CompanyContract.ExcavationData());//excavation data from contract 1
        CompanyContract.setWasteDumpData(JSON.stringify(doc.volumetricsurveydata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        CompanyContractBR.setWasteDumpReport(doc.volumetricsurveydata.waste, doc.volumetricsurveydata.tonnage, { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        callback('ok');
      }
    });
  },
  SaveStockpileSamplingData: function (doc, callback) {
    //publish the business rules contract and execute the blasting business rules
    var db = mongojs(dbUrl.url, ['SmartContract']);
    var cid = JSON.stringify(doc._id).replace(/"/g, "");
    db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        SetWeb3();
        var CompanyContract = web3.eth.contract(docc.abi).at(docc.contractaddress);//Data Contract
        var CompanyContractBR = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);//BR Contract
        var CompanyContractData = JSON.parse(CompanyContract.ContractData());//Company Contract Data
        var ContractorDrillingData = JSON.parse(CompanyContract.DrillingData());//Drilling Data
        var ContractorExcavationData = JSON.parse(CompanyContract.ExcavationData());//Excavation Data

        CompanyContract.setStockpileSamplingData(JSON.stringify(doc.stockpilesamplingdata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });

        CompanyContractBR.setStockpileSamplingReport(ContractorDrillingData.oregrade, doc.stockpilesamplingdata.oregrade,
          ContractorDrillingData.dilution, doc.stockpilesamplingdata.dilution, ContractorDrillingData.moisturecontent, doc.stockpilesamplingdata.moisturecontent,
          doc.stockpilesamplingdata.tonnage, ContractorExcavationData.tonnage, ContractorDrillingData.oregrade, doc.stockpilesamplingdata.oregrade,
          { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        callback('ok');
      }
    });
  },
  SaveTransportationToCrusherData: function (doc, callback) {
    //publish the business rules contract and execute the blasting business rules
    var db = mongojs(dbUrl.url, ['SmartContract']);
    var cid = JSON.stringify(doc._id).replace(/"/g, "");
    db.SmartContract.findOne({ contractid: cid }, function (err, docc) {
      if (err) { console.log(" Woops! The error took place here... "); }
      else {
        SetWeb3();
        var CompanyContract = web3.eth.contract(docc.abi).at(docc.contractaddress);//Data Contract
        var CompanyContractBR = web3.eth.contract(docc.abibr).at(docc.contractaddressbr);//BR Contract
        var CompanyContractData = JSON.parse(CompanyContract.ContractData());//Company Contract Data

        CompanyContract.setTransportationData(JSON.stringify(doc.transportationtocrusherdata), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });

        CompanyContractBR.setTransportationtoCrusher(CompanyContractData.contractdata.mininumtonnagecrusher, doc.transportationtocrusherdata.tonnage,
          CompanyContractData.contractdata.mininumtripscrusher, doc.transportationtocrusherdata.trips,
          { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
        callback('ok');
      }
    });
  },
};