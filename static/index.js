var css = {
  root: "sv_main sv_frame sv_default_css"
};

var surveyJSON = {
 "title": "Pre-award survey",
 "pages": [
  {
   "name": "study",
   "elements": [
    {
     "type": "html",
     "name": "explanation",
     "html": "<h4>Background</h4>\n\n<style>\np    {font-size: 14px;}\nli    {font-size: 14px;}\n</style>\n\n<p>\n  Funding for this grant is provided with the expectation that awardees engage in broad sharing of data, analytical methodology, and other resources in compliance with these data sharing terms, and in accordance with general NIH data sharing policies (NOT-OD-14-124: <a href=\"https://grants.nih.gov/grants/guide/notice-files/NOT-OD-14-124.html\">https://grants.nih.gov/grants/guide/notice-files/NOT-OD-14-124.html</a>)\n</p>\n\n<p>\n  To this end:\n</p>\n\n<ul>\n<li>all datasets used in support of and generated through this project will be made accessible and reusable by qualified individuals other than the original data generators.\n<li>all analytical methodologies will be made fully reproducible and transparent  so that results can be vetted and existing analysis techniques quickly applied to new application areas\n<li>all models of biological systems and networks will be made open to users such that  theoretical predictions can be rapidly validated experimentally.\n<li>all disease models generated in the course of the project will be made freely available to qualified investigators to accelerate their characterization and validation and their translational utility.\n</ul>\n\n<p>\nThe sharing of all content and data integration activities are provided by Sage Bionetworks through the AMP-AD Knowledge Portal (ampadportal.org), a collaborative data platform which serves as an IRB approved environment where data can be stored/accessed and collaboratively analyzed. Data will be made available broadly to all qualified users twice a year. There will be no publication embargo imposed on the use of data after they have been made available through the public portal.\n</p>\n\n<h4>Survey</h4>\n\n<p>\nPlease complete the following survey about your planned study and anticipated yearly milestones. Note that surveys in progress cannot be saved.\n</p>\n"
    },
    {
     "type": "text",
     "name": "foa_number",
     "title": "FOA number",
     "isRequired": true
    },
    {
     "type": "text",
     "name": "grant_number",
     "title": "Grant number",
     "isRequired": true
    },
    {
     "type": "text",
     "name": "pi_name",
     "title": "Contact PI name",
     "isRequired": true
    },
    {
     "type": "text",
     "name": "pi_email",
     "title": "Contact PI email address",
     "isRequired": true,
     "inputType": "email"
    },
    {
     "type": "text",
     "name": "pi_organization",
     "title": "Contact PI organization\n",
     "isRequired": true
    },
    {
     "type": "radiogroup",
     "name": "reuse_data",
     "title": "Will project reuse existing data?",
     "isRequired": true,
     "choices": [
      "yes",
      "no"
     ]
    },
    {
     "type": "comment",
     "name": "data_source",
     "visibleIf": "{reuse_data} = \"yes\"",
     "title": "Describe existing data source. If data is publicly available, please provide a link."
    },
    {
     "type": "comment",
     "name": "study_summary",
     "title": "Study summary",
     "description": "Please provide a succinct summary of the planned study, including its experimental design, use of human data or model systems, and inclusion/exclusion criteria.",
     "isRequired": true
    },
    {
     "type": "paneldynamic",
     "name": "timeline",
     "title": "Timeline of data contributions",
     "isRequired": true,
     "templateElements": [
      {
       "type": "text",
       "name": "grant_year",
       "title": "Grant year",
       "description": " (e.g. 1, 2, 3; not the calendar year)",
       "inputType": "number"
      },
      {
       "type": "checkbox",
       "name": "expected_contribs",
       "title": "Expected contributions",
       "choices": [
        {
         "value": "experimentalData",
         "text": " Experimental data"
        },
        {
         "value": "analysis",
         "text": " Analysis"
        },
        {
         "value": "tool",
         "text": " Tool"
        },
        {
         "value": "other",
         "text": "Other"
        }
       ]
      },
      {
       "type": "comment",
       "name": "experimental_data_desc",
       "visibleIf": "{panel.expected_contribs} contains \"experimentalData\"",
       "title": "Experimental data",
       "description": "Describe what type of data will be shared. Include source of biosamples (brain region, cell types etc) and what assays will be generated from them, or tests or assessments of living individuals (such as cognitive tests, behavioral analysis or imaging). Include the number of individuals, animals, or batches of cultured cells data will be contributed from."
      },
      {
       "type": "comment",
       "name": "analysis_desc",
       "visibleIf": "{panel.expected_contribs} contains \"analysis\"",
       "title": "Analysis",
       "description": "Describe the type of analysis that will be shared and the source of the data that was analyzed. Also indicate if any analytical code will be shared."
      },
      {
       "type": "comment",
       "name": "tool_desc",
       "visibleIf": "{panel.expected_contribs} contains \"tool\"\n",
       "title": "Tool",
       "description": "Describe any research or analytical tools that will be made available, such as vectors, animal models, and reusable software."
      },
      {
       "type": "comment",
       "name": "other_desc",
       "visibleIf": "{panel.expected_contribs} contains \"other\"",
       "title": "Other"
      }
     ],
     "templateTitle": "Anticipated contributions",
     "panelCount": 1,
     "minPanelCount": 1,
     "panelAddText": "Add grant year",
     "panelRemoveText": "Remove grant year"
    }
   ]
  }
 ]
};

var survey = new Survey.Model(surveyJSON);
survey.css = css;
survey.render("survey");
survey.focusFirstQuestion();

function sendDataToServer(survey) {
  var results = survey.data;
  console.log(results);
  $.ajax({
    url: "/submit",
    data: results,
    type: "POST",
    dataType: "JSON",
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

$("#surveyContainer").Survey({
  model: survey,
  onComplete: sendDataToServer
});
