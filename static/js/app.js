const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// fetch the JSON data and console log it
d3.json(url).then(function(data) {

    console.log('All Data',data);

    // create a samples data object
    let samples_data = data.samples[0];
    console.log('Sample Data',data.samples[0]);

    // hold the array of OTU IDs extracted from the samples_data object    
    let otu_ids = samples_data.otu_ids;
    console.log('OTU IDs',otu_ids);

    // hold the array of Sample Values extracted from the samples_data object
    let sample_values = samples_data.sample_values;
    console.log('Sample Values',sample_values);

    // hold the array of OTU Labels extracted from the samples_data object
    let otu_labels = samples_data.otu_labels;
    console.log('OTU Labels',otu_labels);

    // combine sample values and OTU IDs
    let combined_data = sample_values.map((value, index) => ({
            value: value,
            otu_id: otu_ids[index],
            otu_label: otu_labels[index]
        }));
    console.log('Combined Data',combined_data)

    // sort the combined_data array
    let sorted_data = combined_data.sort((a, b) => b.value - a.value);
    console.log('Sorted Data',sorted_data)

    // slice the top 10 from the sorted_data array
    let top_10_sorted_data = sorted_data.slice(0, 10);
    top_10_sorted_data.reverse();
    console.log('Top 10 Data',top_10_sorted_data)

    // create bar plot
    let plotData = [{
        // use the values from top_10_sorted_data
        x: top_10_sorted_data.map(entry => entry.value),
        // use the OTU IDs from top_10_sorted_data
        y: top_10_sorted_data.map(entry => 'OTU ' + entry.otu_id.toString()),
        // Use the otu_labels as hover text
        text: top_10_sorted_data.map(entry => entry.otu_label), 
        type: 'bar',
        orientation: 'h',
    }];

    Plotly.newPlot("bar", plotData);

    // create a bubble chart
    let bubbleData = [{
        // Use otu_ids for x values
        x: combined_data.map(entry => entry.otu_id), 
        // Use sample_values for y values
        y: combined_data.map(entry => entry.value), 
        // Use otu_labels for text values
        text: combined_data.map(entry => entry.otu_label),
        mode: 'markers',
        marker: {
            // Use sample_values for marker size
            size: combined_data.map(entry => entry.value), 
            // Use otu_ids for marker colors
            color: combined_data.map(entry => entry.otu_id),
            // Choose a colorscale
            colorscale: 'Earth' 
        }
    }];

    let layout = {
        xaxis: {
            title: 'OTU ID'
        }
    };

    Plotly.newPlot("bubble", bubbleData,layout);

    // display metadata
    let metadata = data.metadata[0];
    console.log ("metadata",metadata);

    const metadata_container = d3.select("#sample-metadata");

    for (const key in metadata) {
        metadata_container.append("p")
            .text(`${key}: ${metadata[key]}`);
    }

    // Select the dropdown element
    const dropdown = d3.select("#selDataset");

    data.samples.forEach(sample => {
        dropdown.append("option")
        // Use a unique identifier for each sample
            .attr("value", sample.id)
            .text(sample.id);
    });

    dropdown.on("change", function() {
      const selectedSampleId = this.value;
    
    });

});
