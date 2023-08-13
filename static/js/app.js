const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log('All Data',data);
    console.log('Sample Data',data.samples[0]);

   let samples_data = data.samples[0]
   let out_ids = samples_data.otu_ids
   let sample_values = samples_data.sample_values
   let top_10_OTU_IDs = out_ids.slice(0, 10)
   let top_10_Sample_Values = sample_values.slice(0, 10)
   console.log('Top 10 OTU IDs',top_10_OTU_IDs)
   console.log('Top 10 Sample Values',top_10_Sample_Values)
   // Create Plotly plot
   let plotData = [{
    x: top_10_OTU_IDs,
    y: top_10_Sample_Values,
    type: 'bar'
    }];

  let layout = {
    title: 'Top 10 OTU IDs vs Sample Values',
    xaxis: {
      title: 'OTU IDs'
    },
    yaxis: {
      title: 'Sample Values'
    }
  };

  Plotly.newPlot("bar", plotData, layout);
});

//barchart();

 //  let trace1 = {
  //  x: books,
   // y: timesRead,
   // type: 'bar'
 // };
  
 // let data = [trace1];
  
 // let layout = {
 //   title: title
//  };
  
 // Plotly.newPlot("plot", data, layout);
   //let left = names.slice(0, 2);

   
//});

