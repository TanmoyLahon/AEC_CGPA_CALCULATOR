    

    // Credits data for each branch and semester
    const branchCredits = {
        "CIVIL": [18, 20, 26, 22, 27, 21, 20, 19],
        "CHEMICAL": [18, 20, 20, 19, 23, 23, 20, 15],
        "ETE": [20, 18, 21, 21, 23, 22, 22, 21],
        "CSE": [18, 20, 24, 22, 22, 22, 20, 18],
        "ELECTRICAL": [18, 20, 24.5, 22.5, 22, 22, 21, 18],
        "IP": [18, 20, 19, 20, 23, 22, 25, 19],
        "INSTRUMENTATION": [18, 20, 20.5, 22, 21, 22, 21, 18],
        "MECHANICAL": [18, 20, 19, 20, 24, 22, 25, 19]
    };
    
    // Function to update semester input fields based on branch and current semester
    function updateSemesterInputs() {
        const branch = document.getElementById('branch').value;
        const currentSemester = parseInt(document.getElementById('current-semester').value);
        const semesterInputsDiv = document.getElementById('semester-inputs');
        
        // Clear previous inputs
        semesterInputsDiv.innerHTML = '';
        
        if (!branch || !currentSemester) {
            return;
        }
        
        // Create input fields for each semester up to the current semester
        for (let i = 1; i <= currentSemester; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            
            const label = document.createElement('label');
            label.textContent = `Semester ${i} SGPA:`;
            label.htmlFor = `sgpa-${i}`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `sgpa-${i}`;
            input.min = '0';
            input.max = '10';
            input.step = '0.01';
            input.placeholder = 'Enter SGPA';
            
            inputGroup.appendChild(label);
            inputGroup.appendChild(input);
            semesterInputsDiv.appendChild(inputGroup);
        }
    }
    
    // Function to calculate CGPA
    function calculateCGPA() {
        const branch = document.getElementById('branch').value;
        const currentSemester = parseInt(document.getElementById('current-semester').value);
        
        if (!branch || !currentSemester) {
            alert('Please select both branch and current semester');
            return;
        }
        
        let totalWeightedSGPA = 0;
        let totalCredits = 0;
        let sgpaDetails = [];
        
        // Calculate for each semester
        for (let i = 1; i <= currentSemester; i++) {
            const sgpaInput = document.getElementById(`sgpa-${i}`);
            const sgpa = parseFloat(sgpaInput.value);
            
            if (isNaN(sgpa) || sgpa < 0 || sgpa > 10) {
                alert(`Please enter a valid SGPA for Semester ${i} (between 0 and 10)`);
                return;
            }
            
            const semesterCredits = branchCredits[branch][i-1];
            const weightedSGPA = sgpa * semesterCredits;
            
            totalWeightedSGPA += weightedSGPA;
            totalCredits += semesterCredits;
            
            sgpaDetails.push({
                semester: i,
                sgpa: sgpa,
                credits: semesterCredits,
                weighted: weightedSGPA
            });
        }
        
        // Calculate CGPA
        const cgpa = totalWeightedSGPA / totalCredits;
        
        // Display result
        document.getElementById('cgpa-value').textContent = cgpa.toFixed(2);
        
        // Show calculation details
        const detailsDiv = document.getElementById('details');
        let detailsHTML = `<p>Total Credits: ${totalCredits}</p>`;
        detailsHTML += '<p>Calculation breakdown:</p>';
        detailsHTML += '<ul style="list-style-type: none; padding: 0;">';
        
        sgpaDetails.forEach(detail => {
            detailsHTML += `<li>Semester ${detail.semester}: SGPA ${detail.sgpa.toFixed(2)} × ${detail.credits} credits = ${detail.weighted.toFixed(2)}</li>`;
        });
        
        detailsHTML += '</ul>';
        detailsHTML += `<p>CGPA = ${totalWeightedSGPA.toFixed(2)} ÷ ${totalCredits} = ${cgpa.toFixed(2)}</p>`;
        
        detailsDiv.innerHTML = detailsHTML;
        
        // Show result section
        document.getElementById('result').style.display = 'block';
    }
