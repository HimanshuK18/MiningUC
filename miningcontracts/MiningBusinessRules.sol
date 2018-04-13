pragma solidity ^0.4.0;

contract MiningBusinessRules {
address public creator;     
bool public boolMiniral;
bool public boolSampling;
bool public boolDiscardFaceDrilling;
bool public boolOreGrade;
bool public boolTonnageBlasting;
bool public boolDilutionBlasting;
bool public boolOreGradeExcavation;
bool public boolDilutionExcavation;
bool public boolTonnageExcavation;
bool public boolWasteExcavation;
bool public boolTonnageLoading; 
bool public boolTripsLoading;
string public strWasteDump;
bool public boolWasteDump;//added
bool public boolNoWaste;
bool public boolOreWithWaste;
bool public boolstripratio;
bool public boolStockpileStockpileOreGrade;
bool public boolStockpileDilution;
bool public boolStockpileMoisture;
bool public boolStockpileTonnage;
bool public boolGradeReconciliation;
bool public boolTonnageTransportedToCrusher;
bool public boolMinimumTripsToCrusher;


function MiningBusinessRules(string MineralContract, string MineralDrilling,int64 OreGrade, int64 SampleSizeContract, int64 SampleSizeContractor ) 
    {
        creator = msg.sender;
        boolMiniral = keccak256(MineralContract) == keccak256(MineralDrilling);
        boolDiscardFaceDrilling = OreGrade > 2;
        boolSampling = SampleSizeContractor  >=  SampleSizeContract;
    }
    
    function setBlastingReport(int64 DilutionDrilling, int64 DilutionBlasting, int64 TonnageBlastContract, int64 TonnageBlastContractor)
    {
        boolDilutionBlasting = DilutionDrilling -1 <= DilutionBlasting  && DilutionDrilling +1 >= DilutionBlasting;   
        boolTonnageBlasting =  TonnageBlastContractor >=  TonnageBlastContract;
    }
    function setExcavationReport(int64 OreGradeDrilling, int64 OreGradeExcavation,int64 DilutionDrilling, int64 DilutionExcavation,int64 TonnageExcavationContract, int64 TonnageExcavation, int64 ExcavationWaste)
    {
        boolOreGradeExcavation = OreGradeDrilling -1 <= OreGradeExcavation  && OreGradeDrilling +1 >= OreGradeExcavation;
        boolDilutionExcavation = DilutionDrilling -1 <= DilutionExcavation  && DilutionDrilling +1 >= DilutionExcavation;
        boolTonnageExcavation = TonnageExcavation >=  TonnageExcavationContract;
        boolWasteExcavation = ExcavationWaste == 0;
    }
function setLoadingReport(int64 TonnageContract, int64 TonnageLoading,int64 TripsContract, int64 TripsLoading)
    {
        boolTonnageLoading = TonnageContract >= TonnageLoading;
        boolTripsLoading =  TripsLoading >= TripsContract ;
    }
function setWasteDumpReport(int64 Waste, int64 Tonnage)
    {
            /*if (boolWasteExcavation)
            { 
                if (Waste ==0 && TonnageWaste == 0)
                {strWasteDump = "Face is only ore.";}
                else
                {strWasteDump = "Face with ore & waste";}
            }*/
            boolWasteDump = Waste > 0;
            boolstripratio = Waste >= Tonnage*7;
    }

    function setStockpileSamplingReport(int64 OreGradeContrat, int64 OreGradeContractor, int64 DilutionDrilling, int64 DilutionContractor,int64 MoisterDrilling, int64 MoistureContractor,int64 StockpileTonnage,int64 ExcavationTonnage,int64 OreGradeDrilling,int64 OreGradeStockpileSampling)
    {
            boolStockpileStockpileOreGrade  = OreGradeContrat -1 <= OreGradeContractor  && OreGradeContrat +1 >= OreGradeContractor;
            boolStockpileDilution = DilutionDrilling -1 <= DilutionContractor  && DilutionDrilling +1 >= DilutionContractor;
            boolStockpileMoisture = MoisterDrilling -1 <= MoistureContractor  && MoisterDrilling +1 >= MoistureContractor;
            boolStockpileTonnage = StockpileTonnage == ExcavationTonnage;
            boolGradeReconciliation = OreGradeDrilling == OreGradeStockpileSampling;
    }
    
    function setTransportationtoCrusher(int64 ContractTonnageCrusher ,int64 TonnageToCrusher, int64 ContractTripsLoding,int64 TripsToCrusher)
    {
        boolTonnageTransportedToCrusher = TonnageToCrusher >= ContractTonnageCrusher;
        boolMinimumTripsToCrusher = TripsToCrusher >= ContractTripsLoding;
    }
    function ReturnAllBusinessRules() returns (bool,bool,bool,bool,bool,bool,bool,bool,bool,bool,bool,bool,string,bool)
{
    return(boolMiniral, boolSampling, boolDiscardFaceDrilling, boolOreGrade, boolTonnageBlasting, boolDilutionBlasting,
    boolOreGradeExcavation, boolDilutionExcavation, boolTonnageExcavation, boolWasteExcavation, boolTonnageLoading, 
    boolTripsLoading, strWasteDump, boolNoWaste);
}

function ReturnAllBusinessRules1 () returns (bool, bool, bool, bool,bool,bool, bool, bool)
{
    return (boolOreWithWaste, boolStockpileStockpileOreGrade, boolStockpileDilution, boolStockpileMoisture,
    boolStockpileTonnage,boolGradeReconciliation, boolTonnageTransportedToCrusher, boolMinimumTripsToCrusher);
}

function kill()
    { 
        if (msg.sender == creator)
            suicide(creator);  
    }    
}
