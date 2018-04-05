var abi = [ 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "ContractData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "StockpileSampling_Data",
                "type" : "string"
            }
        ],
        "name" : "setStockpileSamplingData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "ExcavationData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "Drilling_Data",
                "type" : "string"
            }
        ],
        "name" : "setDrillingData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "TransportationData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "Loading_Data",
                "type" : "string"
            }
        ],
        "name" : "setLoadingData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "DrillingData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "WasteDump_Data",
                "type" : "string"
            }
        ],
        "name" : "setWasteDumpData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "StockpileSamplingData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "BlastingData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "LoadingData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "Transportation_Data",
                "type" : "string"
            }
        ],
        "name" : "setTransportationData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "Excavation_Data",
                "type" : "string"
            }
        ],
        "name" : "setExcavationData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "constant" : true,
        "inputs" : [],
        "name" : "WasteDumpData",
        "outputs" : [ 
            {
                "name" : "",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "view",
        "type" : "function"
    }, 
    {
        "constant" : false,
        "inputs" : [ 
            {
                "name" : "Blasting_Data",
                "type" : "string"
            }
        ],
        "name" : "setBlastingData",
        "outputs" : [],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "function"
    }, 
    {
        "inputs" : [ 
            {
                "name" : "Contract_Data",
                "type" : "string"
            }
        ],
        "payable" : false,
        "stateMutability" : "nonpayable",
        "type" : "constructor"
    }
];

/////////////////////////////////////////////////////////////////////////////////////////////////

var abibr =[
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolWasteExcavation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolStockpileStockpileOreGrade",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "strWasteDump",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolMinimumTripsToCrusher",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolOreGrade",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolGradeReconciliation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolOreGradeExcavation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolStockpileMoisture",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "TonnageContract",
				"type": "int64"
			},
			{
				"name": "TonnageLoading",
				"type": "int64"
			},
			{
				"name": "TripsContract",
				"type": "int64"
			},
			{
				"name": "TripsLoading",
				"type": "int64"
			}
		],
		"name": "setLoadingReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolSampling",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolOreWithWaste",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolDilutionExcavation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolTonnageTransportedToCrusher",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "ReturnAllBusinessRules",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "ReturnAllBusinessRules1",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "OreGradeDrilling",
				"type": "int64"
			},
			{
				"name": "OreGradeExcavation",
				"type": "int64"
			},
			{
				"name": "DilutionDrilling",
				"type": "int64"
			},
			{
				"name": "DilutionExcavation",
				"type": "int64"
			},
			{
				"name": "TonnageExcavationContract",
				"type": "int64"
			},
			{
				"name": "TonnageExcavation",
				"type": "int64"
			},
			{
				"name": "ExcavationWaste",
				"type": "int64"
			}
		],
		"name": "setExcavationReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolDiscardFaceDrilling",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolTonnageBlasting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolTripsLoading",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolStockpileTonnage",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Waste",
				"type": "int64"
			},
			{
				"name": "TonnageWaste",
				"type": "int64"
			}
		],
		"name": "setWasteDumpReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolStockpileDilution",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "DilutionDrilling",
				"type": "int64"
			},
			{
				"name": "DilutionBlasting",
				"type": "int64"
			},
			{
				"name": "TonnageBlastContract",
				"type": "int64"
			},
			{
				"name": "TonnageBlastContractor",
				"type": "int64"
			}
		],
		"name": "setBlastingReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ContractTonnageCrusher",
				"type": "int64"
			},
			{
				"name": "TonnageToCrusher",
				"type": "int64"
			},
			{
				"name": "ContractTripsLoding",
				"type": "int64"
			},
			{
				"name": "TripsToCrusher",
				"type": "int64"
			}
		],
		"name": "setTransportationtoCrusher",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolTonnageExcavation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "OreGradeContrat",
				"type": "int64"
			},
			{
				"name": "OreGradeContractor",
				"type": "int64"
			},
			{
				"name": "DilutionDrilling",
				"type": "int64"
			},
			{
				"name": "DilutionContractor",
				"type": "int64"
			},
			{
				"name": "MoisterDrilling",
				"type": "int64"
			},
			{
				"name": "MoistureContractor",
				"type": "int64"
			},
			{
				"name": "StockpileTonnage",
				"type": "int64"
			},
			{
				"name": "ExcavationTonnage",
				"type": "int64"
			},
			{
				"name": "OreGradeDrilling",
				"type": "int64"
			},
			{
				"name": "OreGradeStockpileSampling",
				"type": "int64"
			}
		],
		"name": "setStockpileSamplingReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolNoWaste",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolDilutionBlasting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolMiniral",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "boolTonnageLoading",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "MineralContract",
				"type": "string"
			},
			{
				"name": "MineralDrilling",
				"type": "string"
			},
			{
				"name": "OreGrade",
				"type": "int64"
			},
			{
				"name": "SampleSizeContract",
				"type": "int64"
			},
			{
				"name": "SampleSizeContractor",
				"type": "int64"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
module.exports = {abi : abi,abibr : abibr}