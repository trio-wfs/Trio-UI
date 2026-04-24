import figma from '@figma/code-connect'
import { PageHeaderToolbar } from './PageHeaderToolbar'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import { Button } from '../Button/Button'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { Chip } from '../Chip/Chip'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

figma.connect(PageHeaderToolbar, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3859-2813', {
  props: {
    variant: figma.enum('variant', {
      default: 'default',
      full: 'full',
      NewCanvas: 'NewCanvas',
    }),
    pageTitleText: figma.string('Page Title Text'),
    eyebrowText: figma.string('Eyebrow Text'),
  },
  example: ({ variant, pageTitleText, eyebrowText }) => (
    <PageHeaderToolbar
      variant={variant}
      pageTitleText={pageTitleText}
      eyebrowText={eyebrowText}
      chipItems={
        <>
          <Chip size="small" color="default" variant="contained" label="Tag 1" />
          <Chip size="small" color="default" variant="contained" label="Tag 2" />
        </>
      }
      singleButtonContent={<Button variant="contained" color="secondary" size="medium">Single</Button>}
      buttonGroupContent={
        <ButtonGroup variant="contained" color="secondary" size="medium" orientation="horizontal" />
      }
      breadcrumbContent={
        <Breadcrumb
          state="breadcrumb"
          showNumberIndicator={true}
          recordCount="1,284"
          links={[
            { label: 'Parent', href: '#' },
            { label: 'Selected', selected: true },
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
      }
    />
  ),
})
