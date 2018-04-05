pragma solidity ^0.4.0;
contract MiningContractData
{ 
    string public ContractData;
    string public DrillingData;
    string public BlastingData;
    string public ExcavationData;
	string public LoadingData;
	string public WasteDumpData;
	string public StockpileSamplingData;
	string public TransportationData;
    
    function MiningContractData(string Contract_Data)
    { 
        ContractData = Contract_Data;
        DrillingData = '';
        BlastingData = '';
        ExcavationData = '';
	    LoadingData = '';
	    WasteDumpData = '';
	    StockpileSamplingData = '';
	    TransportationData = '';
    }
    function setDrillingData(string Drilling_Data) 
    { 
        DrillingData = Drilling_Data; 
    } 
    function setBlastingData(string Blasting_Data) 
    { 
        BlastingData = Blasting_Data; 
    } 
    function setLoadingData(string Loading_Data) 
    { 
        LoadingData = Loading_Data; 
    } 
    
    function setExcavationData(string Excavation_Data) 
    { 
        ExcavationData = Excavation_Data; 
    } 
    function setWasteDumpData(string WasteDump_Data) 
    { 
        WasteDumpData = WasteDump_Data; 
    } 
    function setStockpileSamplingData(string StockpileSampling_Data) 
    { 
        StockpileSamplingData = StockpileSampling_Data; 
    } 
    function setTransportationData(string Transportation_Data) 
    { 
        TransportationData = Transportation_Data; 
    } 
    
}