import type { TableExporters } from "$models/index";
import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";
applyPlugin(jsPDF);

const exportIRWMPDF = (features: __esri.FeatureSet) => {
  let totalCost = 0;
  let doc = new jsPDF("l");
  let pdf_body = new Array();

  const pdf_head = [
    {
      ProjectName: "Project Name",
      IRWMProjectRankingScore: "Prioritization Score",
      ProjectStatus: "Project Status",
      EstimatedTotalProjectCost: "Project Cost ($)",
      ExpectedCompletionDate: "Expected Completion Date",
      PrimaryProjectIRWMGoal: "Primary IRWM Goal",
      ProjectDescription: "Description",
      AgencyName: "Agency",
    },
  ];

  Object.keys(features.features).map((key: string) => {
    pdf_body.push({
      ProjectName: features.features[key].attributes["ProjectName"],
      IRWMProjectRankingScore:
        features.features[key].attributes["IRWMProjectRankingScore"],
      ProjectStatus: features.features[key].attributes["ProjectStatus"],
      EstimatedTotalProjectCost: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(features.features[key].attributes["EstimatedTotalProjectCost"]),
      ExpectedCompletionDate:
        features.features[key].attributes["ExpectedCompletionDate"],
      PrimaryProjectIRWMGoal:
        features.features[key].attributes["PrimaryProjectIRWMGoal"],
      ProjectDescription:
        features.features[key].attributes["ProjectDescription"],
      AgencyName: features.features[key].attributes["AgencyName"],
    });

    totalCost =
      totalCost +
      features.features[key].attributes["EstimatedTotalProjectCost"];
  });

  pdf_body.push({
    ProjectName: "Total Cost of Projects",
    EstimatedTotalProjectCost: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalCost),
  });

  console.log(pdf_body);

  const date =
    "Orange County IRWM Project List, exported on " +
    new Date(Number(new Date())).toLocaleString();
  doc.text(date, 14, 20);
  //@ts-ignore
  doc.autoTable({
    head: pdf_head,
    body: pdf_body,
    // foot: pdf_footer,
    startY: 25,
    rowPageBreak: "auto",
    bodyStyles: { valign: "top" },
    styles: { cellPadding: 0.5, fontSize: 8 },
    columns: [
      { header: "Project Name", dataKey: "ProjectName" },
      { header: "Prioritization Score", dataKey: "IRWMProjectRankingScore" },
      { header: "Project Status", dataKey: "ProjectStatus" },
      {
        header: "Total Project Cost ($)",
        dataKey: "EstimatedTotalProjectCost",
      },
      { header: "Expected Completion Date", dataKey: "ExpectedCompletionDate" },
      { header: "Primary IRWM Goal", dataKey: "PrimaryProjectIRWMGoal" },
      { header: "Description", dataKey: "ProjectDescription" },
      { header: "Agency Name", dataKey: "AgencyName" },
    ],
    didParseCell: function (data: any) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
        data.cell.styles.fillColor = [239, 154, 154];
      }
    },
  });
  // doc.autoTable({ html: '#tableDiv' })
  doc.save("IRWM_Project_List.pdf");
};

const exportSWRPPDF = (features: __esri.FeatureSet) => {
  let totalCost = 0;

  let doc = new jsPDF("l");
  let pdf_body = new Array();

  const pdf_head = [
    {
      ProjectName: "Project Name",
      Agency: "Agency",
      SWRPProjectScore: "Prioritization Score",
      ProjectStatus: "Project Status",
      EstimatedTotalProjectCost: "Project Cost ($)",
      ExpectedCompletionDate: "Expected Completion Date",
      PrimaryBenefit: "Primary Benefit",
      PrimaryBenefitQuantity: "Value",
      PrimaryBenefitUnits: "Units for Primary Benefit",
      SecondaryBenefit: "Secondary Benefit",
      SecondaryBenefitQuantity: "Value",
      SecondaryBenefitUnits: "Units for Secondary Benefit",
      AdditionalBenefit: "Other Benefit",
      AdditionalBenefitQuantity: "Value",
      AdditionalBenefitUnits: "Units for Other Benefit",
      UseOfPublicLands: "Use of Public Lands",
      Long: "Longitude",
      Lat: "Latitude"
    },
  ];

  Object.keys(features.features).map((key: string) => {
    pdf_body.push({
      ProjectName: features.features[key].attributes["ProjectName"],
      Agency: features.features[key].attributes['Agency'],
      SWRPProjectScore: features.features[key].attributes["SWRPProjectScore"],
      ProjectStatus: features.features[key].attributes["ProjectStatus"],
      EstimatedTotalProjectCost: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(features.features[key].attributes["EstimatedTotalProjectCost"]),
      ExpectedCompletionDate:
        features.features[key].attributes["ExpectedCompletionDate"],
      PrimaryBenefit: features.features[key].attributes["PrimaryBenefit"],
      PrimaryBenefitQuantity:
        features.features[key].attributes["PrimaryBenefitQuantity"],
      PrimaryBenefitUnits:
        features.features[key].attributes["PrimaryBenefitUnits"],
      SecondaryBenefit: features.features[key].attributes["SecondaryBenefit"],
      SecondaryBenefitQuantity:
        features.features[key].attributes["SecondaryBenefitQuantity"],
      SecondaryBenefitUnits:
        features.features[key].attributes["SecondaryBenefitUnits"],
      AdditionalBenefit: features.features[key].attributes["AdditionalBenefit"],
      AdditionalBenefitQuantity:
        features.features[key].attributes["AdditionalBenefitQuantity"],
      AdditionalBenefitUnits:
        features.features[key].attributes["AdditionalBenefitUnits"],
      UseOfPublicLands: features.features[key].attributes["UseOfPublicLands"],
      Long: features.features[key].geometry['x'].toFixed(6),
      Lat: features.features[key].geometry['y'].toFixed(6)
    });

    totalCost =
      totalCost +
      features.features[key].attributes["EstimatedTotalProjectCost"];
  });

  pdf_body.push({
    ProjectName: "Total Cost of Projects",
    EstimatedTotalProjectCost: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalCost),
  });

  console.log(pdf_body);

  const date =
    "Orange County SWRP Project List, exported on " +
    new Date(Number(new Date())).toLocaleString();
  doc.text(date, 14, 20);
  //@ts-ignore
  doc.autoTable({
    head: pdf_head,
    body: pdf_body,
    // foot: pdf_footer,
    startY: 25,
    rowPageBreak: "auto",
    bodyStyles: { valign: "top" },
    styles: { cellPadding: 0.5, fontSize: 8 },
    columns: [
      { header: "Project Name", dataKey: "ProjectName" },
      { header: "Agency", dataKey: "Agency" },
      { header: "Prioritization Score", dataKey: "SWRPProjectScore" },
      {
        header: "Total Project Cost ($)",
        dataKey: "EstimatedTotalProjectCost",
      },
      { header: "Expected Completion Date", dataKey: "ExpectedCompletionDate" },
      { header: "Primary Benefit", dataKey: "PrimaryBenefit " },
      { header: "Value", dataKey: "PrimaryBenefitQuantity" },
      { header: "Units for Primary Benefit", dataKey: "PrimaryBenefitUnits" },
      { header: "Secondary Benefit", dataKey: "SecondaryBenefit" },
      { header: "Value", dataKey: "SecondaryBenefitQuantity" },
      {
        header: "Units for Secondary Benefit",
        dataKey: "SecondaryBenefitUnits",
      },
      { header: "Other Benefit", dataKey: "AdditionalBenefit" },
      { header: "Value", dataKey: "AdditionalBenefitQuantity" },
      { header: "Units for Other Benefit", dataKey: "AdditionalBenefitUnits" },
      { header: "Use of Public Lands", dataKey: "UseOfPublicLands" },
      { header: "Latitude", dataKey: "Lat" },
      { header: "Longitude", dataKey: "Long" },
    ],
    didParseCell: function (data: any) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
        data.cell.styles.fillColor = [239, 154, 154];
      }
    },
  });
  // doc.autoTable({ html: '#tableDiv' })
  doc.save("SWRP_Project_List.pdf");
};

export const exportFunctions: TableExporters = {
  socirwm: exportIRWMPDF,
  ncirwm: exportIRWMPDF,
  swrp: exportSWRPPDF,
};
