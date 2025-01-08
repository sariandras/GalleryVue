const allPhotos = []

const getPhotos = () => {
    var pexelIds = [
      289225, 866019, 255349, 864939, 864990, 675927, 206529, 413727, 413998, 858117, 293029, 826349,
      247199, 255332, 945813,  265705,  247298, 906052, 654690, 863977, 732420, 573299, 415829, 247322, 
      207936, 394545, 594365, 715840, 819469, 746825,  413885, 774367, 269746, 206388, 235516, 805367
    ]
  
    pexelIds.forEach(function(id) {    
      allPhotos.value.push({
        urlPhoto: 'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        urlThumbnail: 'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=400&h=400&auto=compress&cs=tinysrgb',
        id: id
      })
    })
  }
  