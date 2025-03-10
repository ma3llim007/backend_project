 const summary2 = await generateAIContent(`
            Analyze the following job description and candidate's existing skills. Identify **only the missing keywords** that are present in the job description but not in the candidate's resume.

### **Candidate's Resume Information:**
- **Current Skills:** ${skills}

### **Job Description:**
${jobDescription}

### **Guidelines:**
- Extract **technical skills, tools, frameworks, methodologies**, or **industry-relevant terms** missing from the candidate's skill set.
- Provide **only the missing keywords** without any explanation or extra formatting.

### **Expected Output Format:**
Return a **comma-separated list of missing keywords** relevant to the job description.

        `);
        console.log(summary2);