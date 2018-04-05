'use strict';

angular.module('MiningUseCase')
    .controller('ContractController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        var refresh = function () {
            $scope.Contract = {};
            $('#toplabel').text('Mining Contracts Data');
            $("#divtable").show();
            $("#divContractData").hide();
            $("#divtablereport").hide();
            $http.get($scope.baseurl + '/Contracts/' + $scope.uid).then(function (response) {
                $scope.Contractlist = response.data;
                $scope.Contract = {};
            }, function (response) { return "Something went wrong." });
        };
        refresh();

        $scope.CreateContract = function () {
            $("#divtable").hide();
            $("#divContractData").show();
            $("#divtablereport").hide();
            $http.get($scope.baseurl + '/GetContractorList').then(function (response) {
                $scope.ContractorList = response.data;
            });
        };
        $scope.CancelContract = function () {
            $("#divtable").show();
            $("#divContractData").hide();
            $("#divtablereport").hide();
        };
        $scope.SaveContract = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.Contract["Miniral"] = "Zinc";
                var ContractData = { "ContractData": $scope.Contract, "userid": $scope.uid };
                $http.post($scope.baseurl + '/SaveContract/', ContractData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refresh();
                        $("#divtable").show();
                        $("#divContractData").hide();
                        $("#divtablereport").hide();
                        $rootScope.message = "Contract Published";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        };
        $scope.CancelReport = function(){
            $("#divtable").show();
            $("#divContractData").hide();
            $("#divtablereport").hide();
        }
        $scope.CreateReportCompany = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/CompanyReport/' + id + '/' + $scope.uid).then(function (response) {
                $("#divtable").hide();
                $("#divContractData").hide();
                $("#divtablereport").show();
                var label1 = 'Mineral Should be of Zinc  throughout Mine to Mill process';
                var label2 = 'Ore Grade % is maintained within acceptable range throughout Mine To Mill Process';
                var label3 = 'Minimum sample taken as per contract';
                var label4 = 'Blast tonnage should be as per contract';
                var label5 = 'Dilution should be within prescribed range during Blasting, Excavation & Stockpile activity';
                var label6 = 'Excavation Tonnage per day should be minimum as defined in contract';
                var label7 = 'Tonnage Transported should be minimum as defined in contract';
                var label8 = 'Grade reconciliation successful';
                var label9 = 'Tonnage reconciliation successful';
                var grade = false;
                
                if (response.data[1].OreGradeExcavation == true && response.data[2].OreGradeStockpileSampling == true)
                {grade= true;}
                var Dilution = false;
                if (response.data[3].DilutionBlasting == true && response.data[4].DilutionExcavation == true && response.data[5].DilutionStockpileSampling == true)
                { Dilution = true;}
                $scope.ReportData = {
                    "r1": { "label": label1, "output": response.data[0].MiniralReport },
                    "r2": { "label": label2, "output": grade },
                    "r3": { "label": label3, "output": response.data[8].SampleReport },
                    "r4": { "label": label4, "output": response.data[9].BlastTonnage },
                    "r5": { "label": label5, "output": Dilution },
                    "r6": { "label": label6, "output": response.data[10].ExcavationTonnage },
                    "r7": { "label": label7, "output": response.data[11].LoadingTonnage },
                };
                $scope.ReportDataReconcilitaion = {
                    "r1": { "label": label8, "output": response.data[12].GradeReconciliation },
                    "r2": { "label": label9, "output": response.data[13].TonnageReconciliation }
                };
                ShowWait(false);
            }, function (response) { return "Something went wrong." });
        }
    }]);
