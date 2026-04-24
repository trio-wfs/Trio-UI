import figma from '@figma/code-connect'
import { ToggleButton } from './ToggleButton'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

figma.connect(ToggleButton, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=6950-485', {
  props: {
    size: figma.enum('size', {
      sm: 'small',
      md: 'medium',
    }),
  },
  example: ({ size }) => (
    <ToggleButton
      size={size}
      buttons={[
        { icon: <FilterAltOffIcon />, 'aria-label': 'Clear filters' },
        { icon: <FileDownloadIcon />, 'aria-label': 'Export' },
        { icon: <RestartAltIcon />, 'aria-label': 'Reset' },
      ]}
    />
  ),
})
