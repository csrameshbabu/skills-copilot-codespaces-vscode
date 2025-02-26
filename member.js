function skillsMember() {
  var member = {
    name: 'John',
    age: 30,
    skills: ['JS', 'React', 'Node'],
    // Method
    showSkills: function() {
      this.skills.forEach(skill => {
        console.log(`${this.name} knows ${skill}`);
      });
    }
  };
  member.showSkills();
}