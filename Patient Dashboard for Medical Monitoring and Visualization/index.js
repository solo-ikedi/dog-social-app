const ctx = document.getElementById('bloodPressureChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Blood Pressure',
      data: [120, 125, 118, 130, 122],
      borderColor: '#007bff',
      borderWidth: 2,
      fill: false,
    }]
  }
});

async function fetchPatientData() {
  const username = 'coalition';
  const password = 'skills-test';
  const authKey = btoa(`${username}:${password}`);
  
  const loadingElement = document.getElementById('loading');
  loadingElement.textContent = 'Loading data...';
    
  try {
    console.log("Fetching data...");
    
    const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authKey}`,
        'Content-Type': 'application/json'
      }
    });

        if (!response.ok) {
      loadingElement.textContent = 'Error fetching data!';
      console.error('Error fetching data:', response.status, response.statusText);
      throw new Error('Failed to fetch data from API');
    }

        const data = await response.json();
    console.log("Fetched data:", data);

    
    const patient = data.find(p => p.name === 'Jessica Taylor');
    
    if (patient) {
      console.log("Patient found:", patient);
      
      document.getElementById('name').textContent = patient.name;
      document.getElementById('gender').textContent = patient.gender;
      document.getElementById('age').textContent = patient.age;
      document.getElementById('dob').textContent = patient.date_of_birth;
      document.getElementById('phone').textContent = patient.phone_number;
      document.getElementById('emergency').textContent = patient.emergency_contact;
      document.getElementById('insurance').textContent = patient.insurance_type;
      
      
      const profilePic = document.getElementById('profile-pic');
      if (patient.profile_picture) {
        profilePic.src = patient.profile_picture;
      } else {
        profilePic.src = 'default-profile.jpg';
      }

      
      if (patient) {
        loadingElement.style.display = 'none';
    }
    
    } else {
      loadingElement.textContent = 'Patient not found!';
      console.log('Patient not found in the data.');
    }
  } catch (error) {
    console.error('Error:', error);
    loadingElement.textContent = 'An error occurred while loading data.';
  }
}


fetchPatientData();
