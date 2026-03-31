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
    breadcrumb: figma.boolean('Breadcrumb'),
    buttonGroup: figma.boolean('Button Group'),
    chips: figma.boolean('Chips'),
    showEyebrow: figma.boolean('Eyebrow Text2'),
    indicator: figma.boolean('Indicator'),
    inputTextField: figma.boolean('Input Text Field'),
    pageTitleText: figma.string('Page Title Text'),
    eyebrowText: figma.string('Eyebrow Text'),
    singleButton: figma.boolean('Single Button'),
  },
  example: ({ variant, breadcrumb, buttonGroup, chips, showEyebrow, indicator, pageTitleText, eyebrowText, singleButton }) => (
    <PageHeaderToolbar
      variant={variant}
      pageTitleText={pageTitleText}
      showEyebrow={showEyebrow}
      eyebrowText={eyebrowText}
      indicator={indicator}
      chips={chips}
      chipItems={
        <>
          <Chip size="sm" color="default" variant="contained" label="Tag 1" />
          <Chip size="sm" color="default" variant="contained" label="Tag 2" />
        </>
      }
      singleButton={singleButton}
      singleButtonContent={<Button variant="contained" color="secondary" size="md">Single</Button>}
      buttonGroup={buttonGroup}
      buttonGroupContent={
        <ButtonGroup variant="contained" color="secondary" size="md" orientation="horizontal" />
      }
      breadcrumb={breadcrumb}
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
              size="sm"
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
