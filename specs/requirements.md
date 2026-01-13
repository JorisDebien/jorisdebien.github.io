# Purpose
 A simple personal website with clean design to neatly introduce myself, list my career achievements, and show my skills

# General setup
The personal website consists of the following pages: homepage, career, skills

## Homepage
Contains the following:
- a headshot (found in /assets as headshot.svg)
- my name ("Joris Debien")
- links to my Linkedin page (https://www.linkedin.com/in/jorisdebien/) and Github page (https://github.com/JorisDebien/)
- links to the Career and Skills page

## Career
Contains a collapsible card for each entry in assets/career.csv in the following format:
- title: "{Title} at {Company}"
- subtitle: "{From} - {To}"
- content: "{Description}"

The title should always be visible, even if the card is collapsed.

## Skills
Contains a list of skills as found in assets/skills.csv