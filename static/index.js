var css = {
  root: "sv_main sv_frame sv_default_css"
};

var surveyJSON = {
  "pages": [
    {
      "name": "study",
      "elements": [
        {
          "type": "radiogroup",
          "name": "consortium",
          "title": "Consortium",
          "isRequired": false,
          "choices": [
            "AMP-AD",
            "M2OVE-AD",
            "MODEL-AD",
            "Resilience-AD"
          ]
        },
        {
          "type": "dropdown",
          "name": "ampad_grant",
          "visibleIf": "{consortium} = \"AMP-AD\"",
          "title": "Grant",
          "choices": [
            "U01AG046152",
            "U01AG046170",
            "U01AG046139",
            "U01AG046161",
            "5R01AG046174",
            "R01AG046171"
          ]
        },
        {
          "type": "dropdown",
          "name": "m2ovead_grant",
          "visibleIf": "{consortium} = \"M2OVE-AD\"",
          "title": "Grant",
          "choices": [
            "R01AG051556",
            "R01AG051504",
            "R01AG051633",
            "R01AG051550",
            "R01AG051554"
          ]
        },
        {
          "type": "dropdown",
          "name": "modelad_grant",
          "visibleIf": "{consortium} = \"MODEL-AD\"",
          "title": "Grant",
          "choices": [
            "1U54AG054345"
          ]
        },
        {
          "type": "dropdown",
          "name": "resilience_grant",
          "visibleIf": "{consortium} = \"Resilience-AD\"",
          "title": "Grant",
          "choices": [
            "R01AG057907",
            "R01AG057909",
            "R01AG057911",
            "R01AG057912",
            "R01AG057914"
          ]
        },
        {
          "type": "text",
          "name": "funding_date",
          "title": "Funding date",
          "isRequired": false,
          "inputType": "date"
        },
        {
          "type": "text",
          "name": "pi_firstname",
          "title": "PI first name",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "pi_lastname",
          "title": "PI last name",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "pi_email",
          "title": "PI email address",
          "isRequired": false,
          "inputType": "email"
        },
        {
          "type": "comment",
          "name": "study_summary",
          "title": "Study summary",
          "description": "Please describe the planned study(s) in as much detail as possible, including a summary of experimental design(s), human data or model systems, assays that will be used, and estimated total number of samples or measures from which data will be generated for each assay over the lifespan of the grant.",
          "isRequired": false
        },
        {
          "type": "radiogroup",
          "name": "includes_human_data",
          "title": "Includes human data?",
          "isRequired": false,
          "choices": [
            "True",
            "False"
          ]
        },
        {
          "type": "paneldynamic",
          "name": "timeline",
          "title": "Timeline",
          "isRequired": false,
          "templateElements": [
            {
              "type": "text",
              "name": "grant_year",
              "title": "Grant year",
              "description": " (e.g. 1, 2, 3; not the calendar year)",
              "inputType": "number",
              "placeHolder": "1"
            },
            {
              "type": "checkbox",
              "name": "question1",
              "title": "Expected contributions",
              "hasOther": true,
              "choices": [
                {
                  "value": "experimentalData ",
                  "text": " Experimental data"
                },
                {
                  "value": "analysis ",
                  "text": " Analysis"
                },
                {
                  "value": "tool ",
                  "text": " Tool"
                }
              ]
            },
            {
              "type": "comment",
              "name": "contribution_description",
              "title": "Contribution description",
              "description": "Please describe in as much detail as possible, the anticipated data, analyses, and/or tools that will be contributed in this funding year. Leave empty if no contribution is anticipated."
            }
          ],
          "templateTitle": "Anticipated contributions",
          "panelCount": 1,
          "minPanelCount": 1,
          "panelAddText": "Add grant year",
          "panelRemoveText": "Remove grant year"
        }
      ],
      "title": "Study Survey"
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
