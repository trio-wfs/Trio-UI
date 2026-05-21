import figma from '@figma/code-connect'
import { Breadcrumb } from './Breadcrumb'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

figma.connect(Breadcrumb, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=494-3560', {
  props: {
    showNumberIndicator: figma.boolean('Show Number Indicator'),
    state: figma.enum('state', {
      breadcrumb: 'breadcrumb',
      links: 'Links', // Figma value is lowercase 'links'; code state type is 'Links' (capital). Bridge here.
    }),
  },
  example: ({ showNumberIndicator, state }) => (
    <Breadcrumb
      state={state}
      showNumberIndicator={showNumberIndicator}
      recordCount="1,284"
      links={[
        { label: 'Parent', href: '#' },
        { label: 'Child', href: '#' },
        { label: 'Selected Page', selected: true },
      ]}
      actions={
        <ToggleButton
          size="small"
          buttons={[
            { icon: <FilterAltOffIcon />, 'aria-label': 'Clear filters' },
            { icon: <FileDownloadIcon />, 'aria-label': 'Export' },
            { icon: <RestartAltIcon />, 'aria-label': 'Reset' },
          ]}
        />
      }
    />
  ),
})
